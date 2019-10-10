import React from 'react'
import './playground.less'

import decoL from '../../assets/deco-l.svg'
import decoR from '../../assets/deco-r.svg'

import Game from '../../component/Game'

export default class PlayGround extends React.Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()
        this.game = null
        this.state = {
            isStarting: false,
            showStart: false,
            points: 0,
        }
    }
    componentDidMount() {
        this.init(this.canvasRef.current)
    }
    async init(canvas) {
        try {
            this.game = new Game({
                canvas
            })
            await this.game.init()
            this.game.regExposeHandler(({ isDead, addPoint }) => {
                if (addPoint) {
                    const points = this.state.points += 10
                    this.setState({
                        points
                    })
                }
            })
            this.setState({
                showStart: true
            })
        } catch (e) {
            throw e
        }
    }
    start() {
        this.setState({
            showStart: false,
            isStarting: true
        })
        this.game.run()
    }
    render() {
        return (
            <div className="ground">
                { this.state.isStarting && 
                <div className="point-box">
                    <img className="dec-base" src={decoL}></img>
                    <div className="point">{this.state.points}</div>
                    <img className="dec-base" src={decoR}></img>
                </div> }
                { this.state.showStart &&
                <div className="btn-box">
                    <button className="start" onClick={this.start.bind(this)}>开始</button>
                </div> }
                <canvas className="view" ref={this.canvasRef} ></canvas>
            </div>
        )
        
    }
}