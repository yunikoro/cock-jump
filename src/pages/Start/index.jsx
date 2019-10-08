import React from 'react'
import './start.less'
import play from '../../assets/play.svg'


export default class Index extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<div className="bg-board">
            <div className="title">
                疯狂跳跳鸡
            </div>
            <div>
                <button className="play-btn">
                    <img src={play} />
                    玩一玩
                </button>
            </div>
        </div>)
    }
}