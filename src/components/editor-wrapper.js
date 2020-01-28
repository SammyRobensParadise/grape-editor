/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon, CodeBlock, ExitIcon } from 'global-winery'
import Editor from './App'
import { fallbackConfig, isObjectEmpty } from '../utils/data-handler'

const colorsLib = {
  defaultVSCodeColor: '#1d1d1d',
  secondaryCodeColor: '#868686',
  tertiaryVSCodeColor: '#C6C6C6',
  primaryWhite: '#ffffff',
}
const config = 'config';

const Wrapper = styled.div`
  background-color: ${colorsLib.defaultVSCodeColor};
  padding-top: 20px;
  padding-bottom: 60px;
  border-radius: 10px;
  height: ${(p) => (p.height + 200 ? p.height : 600)}px;
  width: ${(p) => (p.width ? p.width : 600)}px;
  z-index: 50;
`
const Tab = styled.div`
  width: ${(p) => (p.width ? p.width / p.numberOfTabs : 400 / p.numberOfTabs)}px;
  height: 40px;
  background: ${(p) => (p.color ? p.color : colorsLib.defaultVSCodeColor)};
  float: right;
  border-radius: 10px 10px 0px 0px;
  left: ${(p) =>
    parseInt(p.width, 10) / (3 / parseInt(p.order, 10))
    - parseInt(p.width, 10) / parseInt(p.numberOfTabs, 10)}px;
  position: absolute;
  top: 0px;
  box-shadow: 6px 0px 32px -15px rgba(0, 0, 0, 0.75);
  z-index: ${(p) => 20 - p.order};
`
const E = styled.div`
  height: 40px;
  width: 100%;
  margin-top: 40px;
  background-color: ${colorsLib.defaultVSCodeColor};
  z-index: 1000;
`
const IconWrapper = styled.div`
  position: absolute;
  top: 2px;
  left: 6px;
  outline: none;
  z-index: 999;
  transform: scale(0.8);
`
const IconExitWrapper = styled.div`
  position: absolute;
  top: 2px;
  right: 6px;
  outline: none;
  float: right;
  z-index: 999;
  transform: scale(0.8);
`
const ActiveFile = styled.h1`
  color: ${colorsLib.primaryWhite};
  font-size: 12px;
  text-align: center;
  margin-block-start: 0px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 200;
`
const FileName = styled.h1`
  color: ${colorsLib.primaryWhite};
  font-size: 16px;
  text-align: center;
  margin-block-start: 0px;
  position: absolute;
  top: 11px;
  left: 50px;
  text-decoration: none;
  font-style: normal;
  font-family: 'Montserrat', sans-serif;
  font-weight: 200;
`
const GetTabs = ({ numberOfTabs, width, fileNamesInEditor }) => {
  const cb = <CodeBlock color={colorsLib.primaryWhite} />
  const exit = <ExitIcon color={colorsLib.primaryWhite} />
  const dots = '...'
  const {
    firstFile, secondFile, thirdFile, fallback,
  } = fileNamesInEditor
  const tabs = []
  let colorAsProps
  let filenameAsProps
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numberOfTabs; i++) {
    switch (i) {
      case 0:
        colorAsProps = colorsLib.efaultVSCodeColor
        filenameAsProps = firstFile
        break
      case 1:
        colorAsProps = colorsLib.secondaryCodeColor
        filenameAsProps = secondFile
        break
      case 2:
        colorAsProps = colorsLib.tertiaryVSCodeColor
        filenameAsProps = thirdFile
        break
      default:
        colorAsProps = colorsLib.defaultVSCodeColor
        filenameAsProps = fallback
        break
    }
    if (filenameAsProps.length >= 15) {
      filenameAsProps = filenameAsProps.substr(0, 10) + dots
    }
    tabs.push(
      <Tab
        order={i + 1}
        key={`Key${i}`}
        color={colorAsProps}
        numberOfTabs={numberOfTabs}
        width={width}
      >
        <IconWrapper>
          <Icon type={cb} />
        </IconWrapper>
        <FileName>{filenameAsProps}</FileName>
        <IconExitWrapper>
          <Icon type={exit} />
        </IconExitWrapper>
      </Tab>,
    )
  }
  return tabs.map(() => <div>{tabs}</div>)
}

class EditorWrapper extends React.PureComponent {
  constructor(props) {
    super(props)
    const retrievedConfigFromLocalStorage = isObjectEmpty(
      window.Editor_getDataFromLocalStorage(config),
    )
      ? fallbackConfig
      : window.Editor_getDataFromLocalStorage(config)
    this.state = {
      localConfig: retrievedConfigFromLocalStorage,
      numberOfTabs: props.numberOfTabs,
      activeFileName: props.activeFileName,
      fileNamesInEditor: props.fileNamesInEditor,
    }
    window.Editor_dispatchDataEventToLocalStorage(config, fallbackConfig)
  }

  render() {
    const {
      localConfig, numberOfTabs, activeFileName, fileNamesInEditor,
    } = this.state
    const { width, height } = localConfig
    return (
      <div>
        <GetTabs numberOfTabs={numberOfTabs} width={width} fileNamesInEditor={fileNamesInEditor} />
        <Wrapper width={width} height={height}>
          <E>
            <ActiveFile>{activeFileName}</ActiveFile>
            <Editor />
          </E>
        </Wrapper>
      </div>
    )
  }
}
EditorWrapper.propTypes = {
  activeFileName: PropTypes.string,
  fileNamesInEditor: PropTypes.shape,
  numberOfTabs: PropTypes.number,
}
EditorWrapper.defaultProps = {
  activeFileName: 'untitled.js',
  fileNamesInEditor: {
    firstFile: 'untitled-1.js',
    secondFile: 'untitled-2.js',
    thirdFile: 'untitled-3.js',
    fallback: 'untitled.js',
  },
  numberOfTabs: 3,
}
export default EditorWrapper
