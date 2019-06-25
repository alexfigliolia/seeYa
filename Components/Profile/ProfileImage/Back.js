import React, { Component } from 'react';
import { Animated, View, Image, Text, TouchableWithoutFeedback, ImagePickerIOS } from 'react-native';
import { connect } from 'react-redux';
import { beginUpload, setImgUrl } from '../../../Actions/User';
import Axios from 'axios';
import Permissions from 'react-native-permissions';
import ProgressView from './ProgressView';
import UploadConfig from './UploadConfig';
import Styles from '../Styles';
import BaseStyles from '../../Base/Styles';
const { center, fillContainer } = BaseStyles;

let Camera = null;

class Back extends Component {
	constructor(props) {
	  super(props);
	  this.state = { uploading: false, progress: 0 };
	  this.cameraDims = this.props.dims * 0.4;
	  this.hasPhotoPermission = false;
		this.selectImage = this.selectImage.bind(this);
		this.finish = this.finish.bind(this);
	}

	componentDidMount() {
		Permissions.check('photo', { type: 'always' }).then(response => {
		  this.hasPhotoPermission = response === 'authorized' || response === 'restricted';
		});
	}

	shouldComponentUpdate({ visible }, { uploading, progress }) {
		const curState = this.state;
		if(visible !== this.props.visible) return true;
		else if(uploading !== curState.uploading) return true;
		else if(progress !== curState.progress) return true;
		return false;
	}

	getIcon() {
		if(Camera) return Camera;
		Camera = require('../../../public/camera.png');
		return Camera;
	}

	getPermission() {
		Permissions.request('photo', { type: 'always' }).then(response => {
	  	this.hasPhotoPermission = response === 'authorized' || response === 'restricted';
	  	if(this.hasPhotoPermission) this.selectImage();
	  	else this.props.flip();
		});
	}

	selectImage() {
		const { clearTimer, beginUpload, flip } = this.props;
		clearTimer();
		if(!this.props.uploading && this.hasPhotoPermission) {
			ImagePickerIOS.openSelectDialog({}, img => {
				beginUpload({ uri: img });
				this.setState({ uploading: true, progress: 0 });
	 			this.upload(img);
	    }, error => flip());
		} else {
			this.getPermission();
		}
	}

	upload(img) {
		const match = /\.(\w+)$/.exec(img);
		const type = match ? `image/${match[1]}` : `image`;
	  const photo = { uri: img, type: type, name: img.split('/').pop() };
	  const data = new FormData();
	  data.append('upload_preset', UploadConfig.preset);
	  data.append('file', photo);
	  Axios.post(UploadConfig.url, data, { 
	  	onUploadProgress: progressEvent => this.calcProgress(progressEvent) 
	  })
		  .then(res => {
		    let url = res.data.secure_url.split('/');
		    url.splice(-2, 0, 'q_auto/f_auto/w_200,h_200,c_fill');
		    url = url.join('/');
		    this.props.setImgUrl(url);
		    //Store url in database
		  })
		  .catch( err => console.log(err) );
	}

	calcProgress({ loaded, total }) {
  	const progress = Math.round((loaded * 100) / total);
  	this.setState({ progress });
  }

  finish() {
  	this.props.flip();
  	setTimeout(() => {
  		this.setState({ uploading: false, progress: 0 });
  	}, 500);
  }

	render() {
		const { dims, anim, borderRadius, visible, gradientColors } = this.props;
		const { uploading, progress } = this.state;
		return (
			<Animated.View style={[Styles.back, center, {
				borderRadius: borderRadius,
				height: dims,
				width: dims,
				transform: [
					{ rotateY: anim.interpolate({
						inputRange: [0, 1],
						outputRange: ['-180deg', '0deg']
					})},
					{ perspective: 500 }
				],
			}]}
			pointerEvents={visible ? 'auto' : 'none'}>
				<TouchableWithoutFeedback
					style={[fillContainer, center]}
					onPress={this.selectImage}>
					{
						uploading ? 
							<ProgressView 
								dims={dims}
								progress={progress}
								finish={this.finish}
								colors={gradientColors} />
						:
							<View style={[fillContainer, center]}>
								<Image 
									source={this.getIcon()}
									style={{
										height: this.cameraDims,
										width: this.cameraDims,
									}} />
								<Text style={Styles.subText}>Change Photo</Text>
							</View>
					}
				</TouchableWithoutFeedback>
			</Animated.View>
		);
	}
}

const mSTP = ({ Dimensions: { gradientColors }}) => {
	return { gradientColors };
}

export default connect(mSTP, { beginUpload, setImgUrl })(Back);
