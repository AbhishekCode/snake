import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Snake from './Snake'
import { gamebox, boundary, cellSize } from '../config/config';


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    gameBox: {
        width: gamebox.width,
        height: gamebox.height,
        border: '2px solid black',
        backgroundColor: '#d9dbdd',
    },
    food: {
        position: 'absolute',
        backgroundColor: 'green',
        width: cellSize,
        height: cellSize
    }
});

export const GAMESTATE = {
    INITIAL: 'initial',
    IN_PROGRESS: "inProgress",
    PAUSED: 'paused',
    ENDED: 'ended',
}


class Game extends Component {

    gameState = GAMESTATE.INITIAL
    food = undefined;
    score = 0;
    state = {
        update: false
    }

    foodPos = undefined

    componentDidMount() {
        window.addEventListener("keydown", this._onKeyPress);
    }



    _onKeyPress = (evt) => {
        if (evt.keyCode === 32) {
            evt.preventDefault();
            if (this.gameState === GAMESTATE.INITIAL || this.gameState === GAMESTATE.PAUSED) {
                this.gameState = GAMESTATE.IN_PROGRESS
                if (!this.foodPos) this._spawnFood()
                this.setState({ update: !this.state.update })
            } else if (this.gameState === GAMESTATE.IN_PROGRESS) {
                this.gameState = GAMESTATE.PAUSED
                this.setState({ update: !this.state.update })
            }
        }
    }

    _spawnFood = () => {
        this.foodPos = {
            top: Math.random() * (boundary.bottom - boundary.top) + boundary.top,
            left: Math.random() * (boundary.right - boundary.left) + boundary.left,
        }
        this.setState({ update: !this.state.update })
    }

    _eatFood = () => {
        this.score += 5;
        this._spawnFood();
    }


    render() {
        return (
            <div className={css(styles.container)} >
                <div className={css(styles.gameBox)}>
                    <Snake gameState={this.gameState} foodPos={this.foodPos} eatFood={this._eatFood} />
                    {this.foodPos && <div className={css(styles.food)} style={this.foodPos}></div>}
                </div>

                <div>{`Score: ${this.score}`}</div>
            </div>
        );
    }
}


export default Game


