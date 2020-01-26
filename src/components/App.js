import React from 'react'
import MonacoEditor from 'react-monaco-editor'
import { fallbackConfig, isObjectEmpty } from '../utils/data-handler'
import Keys from '../constants/keys'

class Editor extends React.PureComponent {
  constructor(props) {
    super(props)
    const retrievedConfigFromLocalStorage = isObjectEmpty(
      window.Editor_getDataFromLocalStorage(Keys.CONFIG),
    )
      ? fallbackConfig
      : window.Editor_getDataFromLocalStorage(Keys.CONFIG)
    this.state = {
      localConfig: retrievedConfigFromLocalStorage,
    }
  }
  editorDidMount(editor, monaco) {
    editor.focus()
  }
  onChange(newValue, e) {}
  render() {
    const code = this.state.code
    const options = {
      selectOnLineNumbers: true,
    }
    return (
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    )
  }
}

export default Editor
