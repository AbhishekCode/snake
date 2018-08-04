import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { windowHeight, windowWidth } from '../config/config';


const cellSize = 20


const styles = StyleSheet.create({
    snakeHorizonatal: {
        display: 'flex',
        flexDirection: 'row',
    },
    snakeVertical: {
        display: 'flex',
        flexDirection: 'column',
    },
    cell: {
        position: 'absolute',
        width: cellSize,
        height: cellSize,
        backgroundColor: 'red'
    }
});

const DIRECTION = {
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
    movingDirection = DIRECTION.RIGHT

    state = {
        update: false
    }

    noOfCell = [0, 1, 2]

    componentDidMount() {
        window.addEventListener("keydown", this._onKeyPress);

        this.startLoop();
    }

    startLoop = () => {
        if (!this._frameId) {
            this._frameId = window.requestAnimationFrame(this.loop);
        }
    }

    loop = () => {
        // perform loop work here

        const { speed } = this.props;

        if (this.movingDirection === DIRECTION.RIGHT) {
            this.pos.left += speed;
            if (this.pos.left > windowWidth()) this.pos.left = 0;
        } else if (this.movingDirection === DIRECTION.LEFT) {
            this.pos.left -= speed;
            if (this.pos.left < 0) this.pos.left = windowWidth();
        } else if (this.movingDirection === DIRECTION.UP) {
            this.pos.top -= speed;
            if (this.pos.top < 0) this.pos.top = windowHeight();
        } else if (this.movingDirection === DIRECTION.DOWN) {
            this.pos.top += speed;
            if (this.pos.top > windowHeight()) this.pos.top = 0;
        }

        this.setState({ update: !this.state.update })
        // Set up next iteration of the loop
        this.frameId = window.requestAnimationFrame(this.loop)

    }

    stopLoop = () => {
        window.cancelAnimationFrame(this._frameId);
        // Note: no need to worry if the loop has already been cancelled
        // cancelAnimationFrame() won't throw an error
    }

    _onKeyPress = (evt) => {
        if (evt.key === "a" || evt.keyCode === 37) {
            evt.preventDefault();
            //left
            if (this.movingDirection != DIRECTION.RIGHT)
                this.movingDirection = DIRECTION.LEFT;
        } else if (evt.key === "d" || evt.keyCode === 39) {
            evt.preventDefault();
            //right
            if (this.movingDirection != DIRECTION.LEFT)
                this.movingDirection = DIRECTION.RIGHT;
        } else if (evt.key === "s" || evt.keyCode === 40) {
            evt.preventDefault();
            //down
            if (this.movingDirection != DIRECTION.UP)
                this.movingDirection = DIRECTION.DOWN;
        } else if (evt.key === "w" || evt.keyCode === 38) {
            evt.preventDefault();
            //up
            if (this.movingDirection != DIRECTION.DOWN)
                this.movingDirection = DIRECTION.UP;
        }
    }


    render() {
        const { top, left } = this.pos;
        const snakeStyle = this.movingDirection == DIRECTION.LEFT || this.movingDirection == DIRECTION.RIGHT ?
            styles.snakeHorizonatal : styles.snakeVertical
        return (
            <div className={css(snakeStyle)}>
                {this.noOfCell.map(i => {
                    const _cellStyle = { top: top, left: left }
                    if (this.movingDirection === DIRECTION.LEFT) {
                        _cellStyle.left -= i * cellSize;
                    }
                    if (this.movingDirection === DIRECTION.RIGHT) {
                        _cellStyle.left += i * cellSize;
                    }
                    if (this.movingDirection === DIRECTION.TOP) {
                        _cellStyle.top += i * cellSize;
                    }
                    if (this.movingDirection === DIRECTION.DOWN) {
                        _cellStyle.top -= i * cellSize;
                    }
                    return (
                        <div className={css(styles.cell)} style={_cellStyle}>
                        </div>
                    )
                })}
            </div>
        );
    }
}


export default Snake

Snake.defaultProps = {
    speed: 1
}


