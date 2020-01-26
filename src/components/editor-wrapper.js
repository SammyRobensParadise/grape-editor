import React from 'react'
import Editor from './App'
import styled from 'styled-components'
import { fallbackConfig, isObjectEmpty } from '../utils/data-handler'
import { Icon, CodeBlock } from 'global-winery'

const defaultVSCodeColor = '#1d1d1d'
const secondaryCodeColor = '#868686'
const Wrapper = styled.div`
  background-color: ${defaultVSCodeColor};
  padding-top: 20px;
  padding-bottom: 40px;
  border-radius: 10px;
  height: ${(p) => (p.height + 200 ? p.height : 600)}px;
  width: ${(p) => (p.width ? p.width : 600)}px;
  z-index: 50;
`
const Tab = styled.div`
  width: ${(p) => (p.width ? p.width / p.numberOfTabs : 600 / p.numberOfTabs)}px;
  height: ${(p) => (p.height ? p.height : 600)}px;
  background: ${(p) => (p.color ? p.color : defaultVSCodeColor)};
  float: right;
  left: ${(p) => (parseInt(p.width, 10) / parseInt(p.order, 10))-parseInt(p.width,10)/p.numberOfTabs}px;
  position: absolute;
  top: 0px;
`
const E = styled.div`
  z-index: 1000;
`
const IconWrapper = styled.div`
  transform: translateY(-30px) translateX(20px);
  outline: none;
`

class EditorWrapper extends React.PureComponent {
  constructor(props) {
    super(props)
    const retrievedConfigFromLocalStorage = isObjectEmpty(
      window.Editor_getDataFromLocalStorage('config'),
    )
      ? fallbackConfig
      : window.Editor_getDataFromLocalStorage('config')
    this.state = {
      localConfig: retrievedConfigFromLocalStorage,
      hasMountedToDOM: false,
      numberOfTabs: 3,
    }
    window.Editor_dispatchDataEventToLocalStorage('config', fallbackConfig)
  }

  componentDidMount() {
    this.setState({
      hasMountedToDOM: true,
    })
  }
  render() {
    const { width, height } = this.state.localConfig
    const { numberOfTabs } = this.state
    const children = <CodeBlock color={'#ffffff'} />
    return (
      <div>
        <Tab color={secondaryCodeColor} numberOfTabs={numberOfTabs} order={2} width={width} />
        <Wrapper width={width} height={height}>
          <IconWrapper>
            <Icon type={children} />
          </IconWrapper>
          <E>
            <Editor />
          </E>
        </Wrapper>
      </div>
    )
  }
}

export default EditorWrapper
