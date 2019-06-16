import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getLocation, getFriends, clearWatch } from './Actions/Proximity';
import Header from './Components/Header';
import ProximityList from './Components/ProximityList';
import Chats from './Components/Chats';
import Profile from './Components/Profile';
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
    const { screen } = this.props;
    return (
      <View style={[center, container]}>
        <Header />
        { screen === 0 && <ProximityList /> }
        { screen === 1 && <Chats /> }
        { screen === 2 && <Profile /> }
        <Footer />
      </View>
    );
  }
}

const mSTP = ({ Dimensions: { screen }}) => {
  return { screen };
}

export default connect(mSTP, { getLocation, getFriends, clearWatch })(App);