import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getLocation, getFriends, clearWatch } from './Actions/Proximity';
import Header from './Components/Header';
import ProximityList from './Components/ProximityList';
import Chat from './Components/Chat';
import Footer from './Components/Footer';
import Styles from './Components/Base/Styles';
const { container, center } = Styles;

class App extends Component {
  constructor(props) {
    super(props);
    const { getLocation, getFriends } = this.props;
    getLocation();
    getFriends();
  }

  shouldComponentUpdate({ screen }) {
    return screen !== this.props.screen;
  }

  componentWillUnmount() {
    this.props.clearWatch();
  }

  render() {
    return (
      <View style={[center, container]}>
        <Header />
        {
          this.props.screen ? 
            <Chat />
          : <ProximityList />
        }
        <Footer />
      </View>
    );
  }
}

const mSTP = ({ Dimensions: { screen }}) => {
  return { screen };
}

export default connect(mSTP, { getLocation, getFriends, clearWatch })(App);