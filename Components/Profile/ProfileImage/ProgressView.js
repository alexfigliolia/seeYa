import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Styles from '../Styles';
import BaseStyles from '../../Base/Styles';

export default class ProgressView extends Component {
	constructor(props) {
	  super(props);
	  const { dims } = this.props;
	  this.radius = dims/2;
	}

	shouldComponentUpdate({ progress }) {
		return progress !== this.props.progress;
	}

	render() {
		const { dims, progress, flip } = this.props;
		const fill = parseInt(progress);
		return (
			<View style={BaseStyles.fillContainer}>
				<AnimatedCircularProgress
				  size={dims}
				  width={10}
				  fill={fill}
				  rotation={0}
				  lineCap='round'
				  tintColor='#FC315D'
				  onAnimationComplete={flip}
				  backgroundWidth={0}>
				  {
				  	children => (
				  		<Text style={[
				  			Styles.fill, 
				  			{ fontSize: this.radius/2 }
				  		]}>{fill}%</Text>
				  	)
				  }
				</AnimatedCircularProgress>
			</View>
		);
	}
}
