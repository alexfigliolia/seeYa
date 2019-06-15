import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Ripple from './Ripple';
import Styles from './Styles';
import BaseStyles from '../Styles';
const { fillContainer, center } = BaseStyles;

export default class RippleButton extends Component {
	constructor(props) {
	  super(props);
	  this.state = { touches: [] };
		this.onPress = this.onPress.bind(this);
		this.clear = this.clear.bind(this);
	}

	onPress(e) {
		const { width, onPress } = this.props;
		onPress && onPress();
		const { locationX, locationY, timestamp } = e.nativeEvent;
		const diffX = Math.max(locationX, width - locationX);
		const diffY = Math.max(locationY, 100 - locationY);
		const circumference = Math.sqrt((diffX * diffX) + (diffY * diffY)) * 2;
		const radius = circumference/2;
		this.setState(({ touches }) => ({
			touches: [...touches, { 
				top: locationY - radius, 
				left: locationX - radius, 
				timestamp,
				radius,
				circumference 
			}]
		}));
	}

	clear() {
		this.setState({ touches: [] });
	}

	render() {
		const { onPress, children, width } = this.props;
		const { touches } = this.state;
		const { length } = touches;
		return (
			<TouchableWithoutFeedback 
				style={fillContainer}
				onPress={this.onPress}>
				<View style={[fillContainer, Styles.relative]}>
					{
						touches.map((touch, i) => {
							return (
								<Ripple 
									key={touch.timestamp}
									index={i}
									length={length}
									{...touch}
									clear={this.clear} />
							);
						})
					}
					<View 
						style={[Styles.raised, center]}
						pointerEvents='none'>
						{ children }
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}
