import React, { Component } from 'react';
import { View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearTextGradient } from 'react-native-text-gradient';
import Styles from '../Styles';
import BaseStyles from '../../Base/Styles';

export default class ProgressView extends Component {
	constructor(props) {
	  super(props);
	  const { dims } = this.props;
	  this.radius = dims/2;
	  this.fontSize = this.radius * 0.65;
	  this.finish = this.finish.bind(this);
	}

	shouldComponentUpdate({ progress }) {
		return progress !== this.props.progress;
	}

	finish() {
		setTimeout(this.props.finish, 2000);
	}

	render() {
		const { dims, progress, colors } = this.props;
		const fill = parseInt(progress);
		return (
			<View style={BaseStyles.fillContainer}>
				<AnimatedCircularProgress
				  size={dims}
				  fill={fill}
				  rotation={0}
				  lineCap='round'
				  backgroundColor='#FFF'
				  backgroundWidth={10}
				  tintColor='#D3D5D9'
				  width={10}
				  onAnimationComplete={this.finish}>
				  {
				  	children => (
				  		<LinearTextGradient 
					  		style={[
					  			Styles.fill, 
					  			{ fontSize: this.fontSize }
					  		]}
					  		colors={colors}
								locations={[0, 1]}
							  start={{ x: 0, y: 0 }}
							  end={{ x: 0, y: 1 }}>{fill}%</LinearTextGradient>
				  	)
				  }
				</AnimatedCircularProgress>
			</View>
		);
	}
}
