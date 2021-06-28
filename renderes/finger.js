import React, { PureComponent } from "react";
import { StyleSheet, View, Image } from "react-native";
import Images from '../assets/index';

const RADIUS = 20;

class Finger extends PureComponent {
  render() {
    const x = this.props.position[0] - RADIUS / 2;
    const y = this.props.position[1] - RADIUS / 2;
    return (
      <View style={[styles.finger, { left: x, top: y }]} >
        <Image source={Images.finger} style={styles.fingerImg} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  finger: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    position: "absolute",
    justifyContent:'center',
    alignItems:'center'
  },
  fingerImg: {
    width: 40,
    height: 40,
    transform: [{
      rotate: "110deg"
    }]
  }
});

export { Finger };
