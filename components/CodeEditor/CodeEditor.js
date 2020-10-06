import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

function CodeEditor({ value, handleValue }) {
  return (
    <CodeMirror
      value={value}
      options={{
        theme: 'monokai',
        keyMap: 'sublime',
        mode: 'jsx'
      }}
    />
  );
}

PlaintextEditor.propTypes = {
  value: PropTypes.object,
  handleValue: PropTypes.func
};

export default PlaintextEditor;
