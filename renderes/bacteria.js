import React, { PureComponent } from "react";
import { StyleSheet, View, Image } from "react-native";
import Images from '../assets';
import * as Animatable from 'react-native-animatable';

const RADIUS = 20;

class Bacteria extends PureComponent {
    constructor(props) {
        super(props);
    }

    handleViewRef = ref => this.view = ref;

    bounce = () => this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

    render() {
        const tempProps = this.props.renderer.props;

        const x = this.props.position[0] - RADIUS / 2;
        const y = this.props.position[1] - RADIUS / 2;
        return (
            <Animatable.View
                animation="pulse"
                iterationCount={"infinite"}
                useNativeDriver={true} duration={1500}
                delay={500}
                direction="alternate-reverse"
                ref={this.handleViewRef}
                style={[styles.finger, { left: x, top: y }, {
                    width: tempProps.radius * 2,
                    height: tempProps.radius * 2,
                }]}
            >
                <Image
                    style={{ width: tempProps.radius, height: tempProps.radius }}
                    source={tempProps.imageSource}
                />
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    finger: {
        position: "absolute",
        justifyContent: 'center', alignItems: 'center',
    }
});

export { Bacteria };
