import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { format } from '../../../Helpers/Numbers';
import { LinearTextGradient } from "react-native-text-gradient";
import Styles from './Styles';
import BaseStyles from '../../Base/Styles';

class Stat extends Component {
	constructor(props) {
	  super(props);
		const isLast = this.props.index === 2;
		this.borderRightWidth = this.isLast ? 0 : 1;
		this.borderRightColor = this.isLast ? 'transparent': '#DDE1EF';
	}

	shouldComponentUpdate({ total }) {
		return total !== this.props.total;
	}

	render() {
		const { propString, total, gradientColors } = this.props;
		return (
			<View style={[BaseStyles.center, Styles.stat, {
				borderRightWidth: this.borderRightWidth,
				borderRightColor: this.borderRightColor
			}]}>
				<LinearTextGradient 
					style={Styles.total}
					colors={gradientColors}
					locations={[0, 1]}
				  start={{ x: 0, y: 0 }}
				  end={{ x: 0, y: 1 }}>{format(total)}</LinearTextGradient>
				<Text style={Styles.type}>{propString}</Text>
			</View>
		);
	}
}

const mSTP = ({ User, Dimensions: { gradientColors }}, { propString }) => {
	return { total: User[propString.toLowerCase()], gradientColors };
}

export default connect(mSTP)(Stat);
