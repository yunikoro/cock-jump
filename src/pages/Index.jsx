import React from 'react'
import './index.less'

import Start from './Start/index.jsx'

export default class Index extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<Start />)
    }
}