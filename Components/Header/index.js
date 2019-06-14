import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { connect } from 'react-redux';
import SearchIcon from './SearchIcon';
import SearchBar from './SearchBar';
import Styles from './Styles';
import BaseStyles from '../Base/Styles';
const { center, fillContainer } = BaseStyles;

class Header extends Component {
	constructor(props) {
	  super(props);
	  const { height, statusBarHeight } = this.props;
	  this.fontSize = height/2.5;
	  this.iconHeight = statusBarHeight > 30 ? this.fontSize*0.85 : this.fontSize*0.95;
	  //^^^^^ this makes a big difference
	  this.searchIconDims = this.iconHeight + (this.iconHeight/2);
	  this.searchIconDimsPlusMargin = this.iconHeight + 21;
	  //^^^^^ this is calculating the header space that
	  //^^^^^ exists after subtracting the search icon
	  this.logoMarginTop = statusBarHeight*0.75;
	  this.anim = new Animated.Value(0);
	  this.search = this.search.bind(this);
	}

	shouldComponentUpdate() {
		return false;
	}

	UNSAFE_componentWillReceiveProps({ searching }) {
		if(searching !== this.props.searching) {
			if(searching) this.search(true);
			else this.search(false)
		}
	}

	search(nextState) {
		Animated.spring(this.anim, {
			toValue: nextState ? 1 : 0, 
			bounciness: 7.5,
			useNativeDriver: true
		}).start();
	}

	render() {
		const { height, statusBarHeight, width } = this.props; 
		return (
			<View style={[Styles.header, center, { height }]}>
				<View style={[Styles.center, fillContainer]}>
					<Animated.Text style={[Styles.logo, {
						marginTop: this.logoMarginTop,
						fontSize: this.fontSize,
						transform: [
							{ translateX: this.anim.interpolate({
								inputRange: [0, 1],
								outputRange: [0, -width/2]
							})}
						]
					}]}>See Ya</Animated.Text>
					<SearchIcon 
						iconHeight={this.iconHeight}
						dims={this.searchIconDims} />
					<SearchBar 
						anim={this.anim}
						height={this.searchIconDims}
						widthOffset={this.searchIconDimsPlusMargin} />
				</View>
			</View>
		);
	}
}

const mSTP = ({ Dimensions, Header }) => {
	const { headerHeight, statusBarHeight, width } = Dimensions;
	const { searching } = Header;
	return { height: headerHeight, statusBarHeight, width, searching };
}

export default connect(mSTP)(Header);