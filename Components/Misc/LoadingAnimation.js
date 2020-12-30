import React, { Component } from 'react';
import LottieView from 'lottie-react-native';

export default class LoadingAnimation extends Component {
    componentDidMount() {
        this.animation.play();
    }
}