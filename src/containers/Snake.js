import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { windowHeight, windowWidth } from '../config/config';

import SnakeCell from './SnakeCell'


const cellSize = 20


const styles = StyleSheet.create({

});

export const DIRECTION = {
    LEFT: 'LEFT',
    RIGHT: "RIGHT",
    UP: 'UP',
    DOWN: 'DOWN',
}


class Snake extends Component {
    pos = {
        top: windowHeight() / 2,
        left: windowWidth() / 2
    }
    movingDirection = DIRECTION.DOWN
    noOfCell = 3;

    state = {
        update: false
    }

    componentDidMount() {
        window.addEventListener("keydown", this._onKeyPress);
    }

    _onKeyPress = (evt) => {
        if (evt.key === "a" || evt.keyCode === 37) {
            evt.preventDefault();
            //left
            if (this.movingDirection != DIRECTION.RIGHT)
                this._changeDirection(DIRECTION.LEFT);
        } else if (evt.key === "d" || evt.keyCode === 39) {
            evt.preventDefault();
            //right
            if (this.movingDirection != DIRECTION.LEFT)
                this._changeDirection(DIRECTION.RIGHT);
        } else if (evt.key === "s" || evt.keyCode === 40) {
            evt.preventDefault();
            //down
            if (this.movingDirection != DIRECTION.UP)
                this._changeDirection(DIRECTION.DOWN);
        } else if (evt.key === "w" || evt.keyCode === 38) {
            evt.preventDefault();
            //up
            if (this.movingDirection != DIRECTION.DOWN)
                this._changeDirection(DIRECTION.UP);
        }


    }

    _changeDirection = (nextDirection) => {
        if (this.movingDirection != nextDirection) {
            this.movingDirection = nextDirection;
            this.setState({ update: !this.state.update })
        }
    }

    render() {
        const { gameState, foodPos, eatFood } = this.props
        return (
            <div>
                <SnakeCell
                    index={0}
                    foodPos={foodPos}
                    eatFood={eatFood}
                    gameState={gameState}
                    movingDirection={this.movingDirection}
                    changeHeadPos={this._changeHeadPos} />
            </div>
        );
    }
}


export default Snake


