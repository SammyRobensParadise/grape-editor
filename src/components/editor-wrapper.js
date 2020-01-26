import React from 'react'
import Editor from './App'
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
            <Editor/>
        )
    }
}

export default EditorWrapper