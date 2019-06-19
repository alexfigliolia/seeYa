import React, { Component } from 'react';
import { Animated, View, Easing } from 'react-native';
import { connect } from 'react-redux';
import Interactable from 'react-native-interactable';
import RippleButton from '../RippleButton';
import RevealItem from './RevealItem';
import Styles from '../ListItem/Styles';
import BaseStyles from '../Styles';

class GestureItem extends Component {
	constructor(props) {
	  super(props);
		this.anim = new Animated.Value(0);
		this.gesture = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.timing(this.anim, {
			toValue: 1, 
			duration: 750, 
			delay: this.props.index * 50, 
			useNativeDriver: true,
			easing: Easing.bezier(0.075, 0.82, 0.165, 1)
		}).start();
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { listItemWidth, gradientColors, children, onPress } = this.props;
		return (
			<View style={{ position: 'relative' }}>
				<Interactable.View
					ref={c => this.item = c}
				  horizontalOnly={true}
				  snapPoints={[{x: -80}, {x: 0}]}
				  boundaries={{left: -160, right: 0}}
				  animatedNativeDriver={true}
				  animatedValueX={this.gesture}>
					<Animated.View style={[BaseStyles.center, Styles.listItem, {
						width: listItemWidth,
						opacity: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [0, 1]
						}),
						transform: [
							{ translateY: this.anim.interpolate({
								inputRange: [0, 1],
								outputRange: [100, 0]
							})}
						],
					}]}>
						<RippleButton 
							onPress={onPress}
							width={listItemWidth}>
							{ children }
						</RippleButton>
					</Animated.View>
				</Interactable.View>
				<RevealItem 
					anim={this.gesture}
					colors={gradientColors} />
			</View>
		);
	}
}

const mSTP = ({ Dimensions: { listItemWidth, gradientColors }}) => {
	return { listItemWidth, gradientColors };
}

export default connect(mSTP)(GestureItem);
