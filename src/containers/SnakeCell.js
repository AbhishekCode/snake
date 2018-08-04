import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { windowHeight, windowWidth, boundary, cellSize } from '../config/config';
import { DIRECTION } from './Snake';
import Game, { GAMESTATE } from './Game';


const styles = StyleSheet.create({
    cell: {
        position: 'absolute',
        width: cellSize,
        height: cellSize,
        backgroundColor: 'red'
    }
});

class SnakeCell extends Component {
    pos = {
        top: 0,
        left: windowWidth() / 2
    }
    movingDirection = undefined;
    trail = []

    length = 40

    changeQueue = []

    state = {
        update: false
    }

    _frameId = undefined;

    componentDidMount() {
        const { movingDirection } = this.props;
        this.movingDirection = movingDirection;
        for (let i = 0; i < this.length; i++) {
            this.trail.push({ ...this.pos, left: this.pos.left });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.movingDirection = nextProps.movingDirection;
        if (this.props.gameState != nextProps.gameState && nextProps.gameState === GAMESTATE.IN_PROGRESS) {
            this.startLoop()
        }

        if (this.props.gameState != nextProps.gameState && nextProps.gameState != GAMESTATE.IN_PROGRESS) {
            this.stopLoop()
        }

    }

    startLoop = () => {
        if (!this._frameId) {
            this._frameId = window.requestAnimationFrame(this.loop);
        }
    }

    loop = () => {
        // perform loop work here
        const { speed } = this.props;
        const movingDirection = this.movingDirection
        if (movingDirection === DIRECTION.RIGHT) {
            this.pos.left += speed;
            if (this.pos.left > boundary.right) this.pos.left = boundary.left;
        } else if (movingDirection === DIRECTION.LEFT) {
            this.pos.left -= speed;
            if (this.pos.left < boundary.left) this.pos.left = boundary.right;
        } else if (movingDirection === DIRECTION.UP) {
            this.pos.top -= speed;
            if (this.pos.top <= boundary.top) this.pos.top = boundary.bottom;
        } else if (movingDirection === DIRECTION.DOWN) {
            this.pos.top += speed;
            if (this.pos.top >= boundary.bottom) this.pos.top = boundary.top;
        }

        this._eatFood()

        this.setState({ update: !this.state.update })
        // Set up next iteration of the loop
        this.frameId = window.requestAnimationFrame(this.loop)

    }

    _eatFood = () => {
        if (Math.abs(this.pos.top - this.props.foodPos.top) < cellSize && Math.abs(this.pos.left - this.props.foodPos.left) < cellSize) {
            //collision
            this.length += 1;
            this.props.eatFood();
        }
    }

    stopLoop = () => {
        window.cancelAnimationFrame(this._frameId);
        // Note: no need to worry if the loop has already been cancelled
        // cancelAnimationFrame() won't throw an error
    }


    _pushNewTrail = (cellStyle) => {
        this.trail.push(cellStyle);
    }

    render() {
        const { top, left } = this.pos;
        const _cellStyle = {
            top: top,
            left: left
        }
        const trail = this.trail.map((_trail, i) =>
            <div key={i} className={css(styles.cell)} style={_trail}>
            </div>
        )

        this._pushNewTrail(_cellStyle)
        if (this.length < this.trail.length) {
            this.trail.shift();
        }

        return (
            <div>
                <div className={css(styles.cell)} style={_cellStyle}>
                </div>
                {trail}
            </div>
        );
    }
}


export default SnakeCell

SnakeCell.defaultProps = {
    speed: 2
}



