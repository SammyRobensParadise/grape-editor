import React from 'react';
import './Entry.css';
import EditorWrapper from './components/editor-wrapper';

const EntryPointClassName = 'entry-point-wrapper';
function EntryPoint() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={EntryPointClassName}>
      <EditorWrapper />
    </div>
  );
}

export default EntryPoint;
