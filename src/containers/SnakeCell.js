import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { windowHeight, windowWidth } from '../config/config';
import { DIRECTION } from './Snake';


const cellSize = 10

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
        top: windowHeight() / 2,
        left: 0
    }
    movingDirection = undefined;
    trail = []

    length = 40

    changeQueue = []

    state = {
        update: false
    }

    componentDidMount() {
        const { movingDirection } = this.props;
        this.movingDirection = movingDirection;
        for (let i = 0; i < this.length; i++) {
            this.trail.push({ ...this.pos, left: this.pos.left });
        }


        this.startLoop();
    }

    componentWillReceiveProps(nextProps) {
        this.movingDirection = nextProps.movingDirection;
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
            if (this.pos.left > windowWidth()) this.pos.left = 0;
        } else if (movingDirection === DIRECTION.LEFT) {
            this.pos.left -= speed;
            if (this.pos.left < 0) this.pos.left = windowWidth();
        } else if (movingDirection === DIRECTION.UP) {
            this.pos.top -= speed;
            if (this.pos.top < 0) this.pos.top = windowHeight();
        } else if (movingDirection === DIRECTION.DOWN) {
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
        this.trail.shift();

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
    speed: 1
}



