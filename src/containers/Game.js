import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Snake from './Snake'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    }
});

const GAMESTATE = {
    INITIAL: 'initial',
    IN_PROGRESS: "inProgress",
    PAUSED: 'paused',
    ENDED: 'ended',
}


class Game extends Component {

    componentDidMount() {
        window.addEventListener("keydown", this._onKeyPress);
    }

    _onKeyPress = (evt) => {
        if (evt.key === "a" || evt.keyCode === 37) {
            evt.preventDefault();
        } else if (evt.key === "d" || evt.keyCode === 39) {
            evt.preventDefault();
        } else if (evt.key === "s" || evt.keyCode === 40) {
            evt.preventDefault();
        }
    }


    render() {
        return (
            <div className={css(styles.container)} >
                snake game

                <Snake />
            </div>
        );
    }
}


export default Game


