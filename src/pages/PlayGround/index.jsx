import React from 'react'
import './playground.less'

import decoL from '../../assets/deco-l.svg'
import decoR from '../../assets/deco-r.svg'
import bar from '../../assets/bar.svg'

import Game from '../../component/Game'

export default class PlayGround extends React.Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()
        this.game = null
        this.state = {
            isStarting: false,
            showStart: false,
            showReplay: false,
            points: 0,
            fps: 0,
        }
    }
    componentDidMount() {
        console.log('mount')
        this.init(this.canvasRef.current)
    }
    async init(canvas) {
        try {
            this.game = new Game({
                canvas
            })
            await this.game.init()
            this.game.regExposeHandler(({ isDead, addPoint, fps }) => {
                if (addPoint) {
                    const points = this.state.points += 10
                    this.setState({
                        points,
                        fps
                    })
                }
                if (isDead) {
                    // console.log('show end')
                    this.setState({
                        isStarting: false,
                        showReplay: true
                    })
                } 
            })
            this.game.run()
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
        this.game.started = true
        this.game.emission()
    }
    reset() {
        this.setState({
            showReplay: false,
        })
        this.game.reset()
        this.setState({
            showStart: true,
            isStarting: false
        })
    }
    render() {
        return (
            <div className="ground">
                {this.state.showReplay && <div className="end-modal-box">
                    <div className="end-modal">
                        <div>
                            <div className="title">你的得分</div>
                            <div className="score">{this.state.points}</div>
                            <div>
                                <img className="y-bar" src={bar} />
                            </div>
                        </div>
                        <div className="replay-box">
                            <button onClick={this.reset.bind(this)}>再来一局</button>
                        </div>
                    </div>
                </div>}
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