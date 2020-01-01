import React, { Component } from 'react';
import { View, Text} from 'react-native';

class Spacer extends Component {
  render() {
    return (
        <View style={{ height: this.props.size}}>
        </View>
    );
  }
}

export default Spacer;