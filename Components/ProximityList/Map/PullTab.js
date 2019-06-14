import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';
import Down from '../../../public/down-white.png';
import Styles from './Styles';
import BaseStyles from '../../Base/Styles';

class PullTab extends Component {
	constructor(props) {
	  super(props);
		this.arrowDims = this.props.is5 ? 35 : 40;
	}

	shouldComponentUpdate({ toggled }) {
		return toggled !== this.props.toggled;
	}

	render() {
		const { panHandlers, toggled, animation } = this.props;
		return (
			<View 
        style={[BaseStyles.center, Styles.mapTab, { 
          height: toggled ? 60 : 40
        }]}
        {...panHandlers}>
        <Animated.Image 
          source={Down}
          style={[ animation, {
            height: this.arrowDims, 
            width: this.arrowDims,
            transform: [{ rotate: toggled ? '180deg' : '0deg' }],
          }]} />
      </View>
		);
	}
}

const mSTP = ({ Dimensions: { is5 }}) => {
	return { is5 };
}

export default connect(mSTP)(PullTab);
