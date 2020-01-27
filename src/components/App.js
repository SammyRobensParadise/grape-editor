/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React from 'react'
import MonacoEditor from 'react-monaco-editor'
import styled from 'styled-components'
import { fallbackConfig, isObjectEmpty } from '../utils/data-handler'

const EditorWrapper = styled.div`
  z-index: 99999;
`

class Editor extends React.PureComponent {
  constructor(props) {
    super(props)
    const retrievedConfigFromLocalStorage = isObjectEmpty(
      window.Editor_getDataFromLocalStorage('config'),
    )
      ? fallbackConfig
      : window.Editor_getDataFromLocalStorage('config')
    this.state = {
      localConfig: retrievedConfigFromLocalStorage,
    }
    window.Editor_dispatchDataEventToLocalStorage('config', fallbackConfig)
  }


  editorDidMount(editor, _monaco) {
    editor.focus()
  }

  // onChange(newValue, e) {}

  render() {
    const { localConfig } = this.state
    const {
      language, width, height, theme, code, options,
    } = localConfig
    return (
      <EditorWrapper>
        <MonacoEditor
          width={width}
          height={height}
          language={language}
          theme={theme}
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      </EditorWrapper>
    )
  }
}

export default Editor
