import React, { Component } from 'react';
import { Animated, View, Easing } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Styles from '../Styles';
import BaseStyles from '../../../Base/Styles';
import ListItemStyles from '../../../Base/ListItem/Styles';
import AvatarStyles from '../../../Base/Avatar/Styles';
const { fillContainer, center } = BaseStyles;

class Item extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = { locations: [0, 1] };
    this.animator = new Animated.Value(0);
    this.colors = ['#DEECF0', '#F0F4F4'];
    this.start = {x: 0, y: 0};
    this.end = {x: 1, y: 0};
  }

  componentDidMount() {
  	this.animate();
  	if(!this.props.loadingFriends) this.leave();
  }

  UNSAFE_componentWillReceiveProps({ loadingFriends }) {
    if(this.props.loadingFriends && !loadingFriends) {
    	this.leave()
    }
  }

  shouldComponentUpdate(nextProps, { locations }) {
  	return locations[0] !== this.state.locations[0];
  }

  componentWillUnmount() {
  	clearInterval(this.interval);
  	this.interval = null;
  }

  animate() {
  	let plus = true;
  	this.interval = setInterval(() => {
			this.setState(({ locations }) => {
				let next;
				if(locations[0] >= 0.9 && plus) plus = false;
				else if(locations[0] <= 0.1 && !plus) plus = true;
				if(plus) next = parseFloat(locations[0] + 0.1);
				else next = parseFloat(locations[0] - 0.1);
				return { locations: [ next, 1 ] };
			});
  	}, 17);
  }

  leave() {
  	const { index, length } = this.props;
  	Animated.timing(this.animator, {
			toValue: 1, 
			duration: 500, 
			delay: ((length - 1) - index) * 150, 
			useNativeDriver: true,
			easing: Easing.bezier(0.55, 0.085, 0.68, 0.53)
		}).start(() => {
			if(index === 0) this.props.showList();
		});
  }

  render() {
  	const { listItemWidth, listItemInfoWidth, index, length } = this.props;
  	const { locations } = this.state;
    return (
      <Animated.View style={[center, ListItemStyles.listItem, {
				width: listItemWidth,
				marginTop: index === 0 ? 10 : 5,
				marginBottom: index === length - 1 ? 10 : 5,
				opacity: this.animator.interpolate({
					inputRange: [0, 1],
					outputRange: [1, 0]
				}),
				transform: [
					{ translateY: this.animator.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 100]
					})}
				]
			}]}>
				<View style={[fillContainer, center, Styles.friendCenter]}>
					<LinearGradient 
						colors={this.colors}
						locations={locations}
						start={this.start} 
						end={this.end}
						style={[center, AvatarStyles.image, Styles.skeletonBG]} />
					<View style={[ListItemStyles.infoMargin, { width: listItemInfoWidth }]}>
						<LinearGradient 
							colors={this.colors}
							locations={locations}
							start={this.start} 
							end={this.end}
							style={[Styles.skeletonBG, Styles.skeletonTitle]} />
						<LinearGradient 
							colors={this.colors}
							locations={locations}
							start={this.start} 
							end={this.end}
							style={[Styles.skeletonBG, Styles.skeletonSubTitle]} />
					</View>
				</View>
			</Animated.View>
    );
  }
}

const mSTP = ({ Proximity, Dimensions }) => {
	const { loadingFriends } = Proximity;
	const { listItemWidth, listItemInfoWidth } = Dimensions;
	return { loadingFriends, listItemWidth, listItemInfoWidth };
}

export default connect(mSTP)(Item);