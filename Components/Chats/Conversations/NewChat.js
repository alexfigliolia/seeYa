import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import { connect } from 'react-redux';
import RippleButton from '../../Base/RippleButton';
import UserName from '../../Base/UserName';
import Styles from '../Styles';
import BaseStyles from '../../Base/Styles';
const { center, fillContainer } = BaseStyles;

let Add;

class NewChat extends Component {

	shouldComponentUpdate() {
		return false;
	}

	getIcon() {
		if(Add) return Add;
		Add = require('../../../public/add.png');
		return Add;
	}

	render() {
		const { listItemWidth } = this.props;
		return (
			<View style={[
				Styles.newChat, 
				center,
				{ width: listItemWidth }
			]}>
				<RippleButton 
					width={listItemWidth}>
					<View style={[center, fillContainer, Styles.row]}>
						<UserName name='New' />
						<Image 
							style={Styles.add}
							source={this.getIcon()} />
					</View>
				</RippleButton>
			</View>
		);
	}
}

const mSTP = ({ Dimensions: { listItemWidth }}) => {
	return { listItemWidth }; 
}

export default connect(mSTP)(NewChat);
