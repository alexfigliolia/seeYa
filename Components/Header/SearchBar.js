import React, { Component } from 'react';
import { Animated, TextInput } from 'react-native'; 
import { connect } from 'react-redux';
import { updateSearchValue } from '../../Actions/Header';
import Styles from './Styles';

class SearchBar extends Component {
	constructor(props) {
	  super(props);
	  this.onFocus = this.onFocus.bind(this);
	  this.onChange = this.onChange.bind(this);
	  const { height, width, widthOffset } = this.props;
	  this.searchIconAreaWithMargin = height + 21;
	  this.containerWidth = width - widthOffset;
	  this.fontSize = (height * 0.85) * 0.5;
	}

	shouldComponentUpdate({ searchValue }) {
		return searchValue !== this.props.searchValue;
	}

	UNSAFE_componentWillReceiveProps({ searching }) {
		if(searching !== this.props.searching) {
			searching ? this.input.focus() : this.input.blur();
		}
	}

	onFocus() {
		const { searchValue, updateSearchValue } = this.props;
		if(searchValue === 'Search:') {
			updateSearchValue('');
		}
	}

	onChange(value) {
		this.props.updateSearchValue(value);
	}

	render() {
		const { height, width, anim, searchValue, widthOffset } = this.props;
		return (
			<Animated.View style={[Styles.searchBar, {
				transform: [
					{ translateX: anim.interpolate({
						inputRange: [0, 1],
						outputRange: [width, 0]
					})}
				],
				height,
				width: this.containerWidth
			}]}>
				<TextInput
					ref={c => this.input = c}
	        style={[Styles.textInput, { fontSize: this.fontSize }]}
	        placeholder='Search:'
	        placeholderTextColor='#7C7F8A'
	        returnKeyType='search'
	        clearButtonMode='always'
	        autoCorrect={false}
	        autoCompleteType='name'
	        textContentType='name'
	        onFocus={this.onFocus}
	        onChangeText={this.onChange}
	        value={searchValue}
	      />
			</Animated.View>
		);
	}
}

const mSTP = ({ Dimensions, Header }) => {
	const { width } = Dimensions;
	const { searchValue, searching } = Header;
	return { width, searchValue, searching };
}

export default connect(mSTP, { updateSearchValue })(SearchBar);
