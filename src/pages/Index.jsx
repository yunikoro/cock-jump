import React from 'react'
import './index.less'

import Start from './Start/index.jsx'
import PlayGround from './PlayGround/index.jsx'

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPrestart: false
        }
    }
    playOnePlay() {
        this.setState({
            isPrestart: true
        })
    }
    render() {
        return (
            <div>
                {this.state.isPrestart ? <PlayGround /> : <Start playHandler={this.playOnePlay.bind(this)} />}
            </div>
        )
    }
}