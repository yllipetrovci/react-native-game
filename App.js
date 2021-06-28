import React, { PureComponent } from "react";
import { StyleSheet,  View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Finger } from "./renderes/finger";
import { Bacteria } from "./renderes/bacteria";
import { MoveFinger, MatchBacteries } from "./systems"
import Images from './assets';

const windowWidth = Dimensions.get('window').width;
const heightWidth = Dimensions.get('window').height;

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      running: false,
      scoreResult: 0
    }
  }

  getRandomPositions = (componentSize) => {
    return [
      Math.floor(Math.random() * (windowWidth - (componentSize + 10))),
      (50+Math.floor(Math.random() * (heightWidth - 100 - (componentSize + 10))))
    ];
  }

  getRandomSize = () => {
    return Math.random() * (50 - 30) + 30;
  }

  getRandomBacteriaImages = () => {
    return Images["bacteria" + (Math.floor((Math.random() * 7)) + 1)];
  }

  getEntities = () => {
    const randomSize = this.getRandomSize();
    const BACTERIA_1_RADIUS = randomSize;
    const BACTERIA_2_RADIUS = randomSize + 10;
    const BACTERIA_3_RADIUS = randomSize + 15;

    return {
      finger: { type: 'finger', position: [(windowWidth / 2) - 20, 780], renderer: <Finger /> },
      bacteria1: { type: 'bacteria', position: this.getRandomPositions(BACTERIA_1_RADIUS), renderer: <Bacteria imageSource={this.getRandomBacteriaImages()} radius={BACTERIA_1_RADIUS} /> },
      bacteria2: { type: 'bacteria', position: this.getRandomPositions(BACTERIA_2_RADIUS), renderer: <Bacteria imageSource={this.getRandomBacteriaImages()} radius={BACTERIA_2_RADIUS} /> },
      bacteria3: { type: 'bacteria', position: this.getRandomPositions(BACTERIA_3_RADIUS), renderer: <Bacteria imageSource={this.getRandomBacteriaImages()} radius={BACTERIA_3_RADIUS} /> },
      bacteria4: { type: 'bacteria', position: this.getRandomPositions(BACTERIA_3_RADIUS), renderer: <Bacteria imageSource={this.getRandomBacteriaImages()} radius={BACTERIA_3_RADIUS} /> },
      bacteria5: { type: 'bacteria', position: this.getRandomPositions(BACTERIA_3_RADIUS), renderer: <Bacteria imageSource={this.getRandomBacteriaImages()} radius={BACTERIA_3_RADIUS} /> },
      bacteria6: { type: 'bacteria', position: this.getRandomPositions(BACTERIA_3_RADIUS), renderer: <Bacteria imageSource={this.getRandomBacteriaImages()} radius={BACTERIA_3_RADIUS} /> },
      bacteria7: { type: 'bacteria', position: this.getRandomPositions(BACTERIA_3_RADIUS), renderer: <Bacteria imageSource={this.getRandomBacteriaImages()} radius={BACTERIA_3_RADIUS} /> },
      bacteria8: { type: 'bacteria', position: this.getRandomPositions(BACTERIA_3_RADIUS), renderer: <Bacteria imageSource={this.getRandomBacteriaImages()} radius={BACTERIA_3_RADIUS} /> },
      bacteria9: { type: 'bacteria', position: this.getRandomPositions(BACTERIA_3_RADIUS), renderer: <Bacteria imageSource={this.getRandomBacteriaImages()} radius={BACTERIA_3_RADIUS} /> },
      bacteria10: { type: 'bacteria', position: this.getRandomPositions(BACTERIA_3_RADIUS), renderer: <Bacteria imageSource={this.getRandomBacteriaImages()} radius={BACTERIA_3_RADIUS} /> },
    }
  }

  onCallBackEvent = (type) => {
    switch (type) {
      case 'started':
      case 'bacteria-match':
        this.setState({ running: true, scoreResult: this.state.scoreResult + 1 });
        break;

      case 'update-score':
        this.setState({ running: true, scoreResult: this.state.scoreResult + 1 });
        break;
      case 'end-game':
        console.log('end-game')
        this.setState({ ...this.state, running: false });
        break;
    }
  }

  onPressNewGame = () => {
    this.setState({
      running: true, scoreResult: 0
    })
    this.refs.engine.swap(this.getEntities());
  }

  render() {
    return (
      <GameEngine
        style={styles.container}
        systems={[MoveFinger, MatchBacteries]}
        onEvent={this.onCallBackEvent}
        running={this.state.running}
        ref="engine"
        entities={this.getEntities()}>
        {this.state.running &&
          <View style={{ paddingTop: 50, marginLeft: 20, width: 100 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Score: {this.state.scoreResult}</Text>
          </View>}
        {!this.state.running &&
          <View style={styles.optionPanelView}>
            <Image source={Images.newGame} />
            <TouchableOpacity onPress={this.onPressNewGame}
              style={styles.newGameBtn}>
              <Text style={styles.newGameTxt}>New Game</Text>
            </TouchableOpacity>
            <Text style={styles.scoreTxt}>Score: {this.state.scoreResult}</Text>
          </View>
        }
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  optionPanelView: {
    flex: 1,
    borderWidth: 0.5,
    backgroundColor: 'rgb(47,58,146)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  newGameBtn: {
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: 'rgb(248,177,62)',
    borderColor: 'black',
    width: 200, height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  newGameTxt: {
    fontWeight: 'bold', fontSize: 20, color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5
  },
  scoreTxt: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white'
  }
});