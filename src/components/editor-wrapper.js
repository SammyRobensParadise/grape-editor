import React from 'react'
import App from './App'
class EditorWrapper extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            hasMountedToDOM: false
        }
    }
    componentDidMount(){
        this.setState({
            hasMountedToDOM: true
        })
    }
    render(){
        return(
            <App/>
        )
    }
}

export default EditorWrapper