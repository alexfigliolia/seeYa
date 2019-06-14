import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback, View, Easing } from 'react-native';
import { connect } from 'react-redux';
import Interactable from 'react-native-interactable';
import RevealItem from './RevealItem';
import Styles from '../ListItem/Styles';
import BaseStyles from '../Styles';

class GestureItem extends Component {
	constructor(props) {
	  super(props);
		this.anim = new Animated.Value(0);
		this.gesture = new Animated.Value(0);
		this.onSnap = this.onSnap.bind(this);
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

	shouldComponentUpdate({ index, length }) {
		const curProps = this.props;
		if(index !== curProps.index) return true;
		else if(length !== curProps.length) return true;
		return false;
	}

	onSnap(e) {
		// console.log(e);
		//instance.snapTo({index: 2});
	}

	render() {
		const { listItemWidth, index, length, children } = this.props;
		const marginTop = index === 0 ? 10 : 5;
		return (
			<View style={{ position: 'relative' }}>
				<TouchableWithoutFeedback>
					<Interactable.View
						ref={c => this.item = c}
					  horizontalOnly={true}
					  snapPoints={[{x: -80}, {x: 0}]}
					  boundaries={{left: -160, right: 0}}
					  animatedNativeDriver={true}
					  animatedValueX={this.gesture}
					  onSnap={this.onSnap}>
						<Animated.View style={[BaseStyles.center, Styles.listItem, {
							width: listItemWidth,
							marginTop,
							marginBottom: index === length - 1 ? 10 : 5,
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
							{ children }
						</Animated.View>
					</Interactable.View>
				</TouchableWithoutFeedback>
				<RevealItem 
					anim={this.gesture}
					style={{ top: marginTop }} />
			</View>
		);
	}
}

const mSTP = ({ Dimensions: { listItemWidth }}) => {
	return { listItemWidth };
}

export default connect(mSTP)(GestureItem);
