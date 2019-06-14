import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Item from './Item';
import Styles from '../Styles';
import BaseStyles from '../../../Base/Styles';

export default class Skeleton extends Component {

  shouldComponentUpdate() {
  	return false;
  }

  render() {
  	const { numChildren, showList } = this.props;
  	const items = [];
  	for(let i = 0; i < numChildren; i++) items.push(i);
    return (
      <ScrollView style={[
        BaseStyles.fillContainer, 
        Styles.listSpacing
      ]}>
        {
          items.map((el, i) => {
            return (
              <Item 
                key={i}
                index={i}
                length={numChildren}
                showList={showList} />
            );
          })
        }
      </ScrollView>
    );
  }
}