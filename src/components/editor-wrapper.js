import React from 'react'

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
            <p>sample text</p>
        )
    }
}

export default EditorWrapper