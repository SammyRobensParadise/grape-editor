import React from 'react'
import MonacoEditor from 'react-monaco-editor'
import { fallbackConfig, isObjectEmpty } from '../utils/data-handler'
import Keys from '../constants/keys'

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
    window.Editor_dispatchDataEventToLocalStorage('config',fallbackConfig);
  }
  editorDidMount(editor, monaco) {
    editor.focus()
  }
  onChange(newValue, e) {}
  render() {
    const {language,width,height,theme,code,options} = this.state.localConfig
    return (
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
    )
  }
}

export default Editor
