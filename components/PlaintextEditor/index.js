import React from 'react';
import PropTypes from 'prop-types';
import { TextareaAutosize } from '@material-ui/core';

import css from './style.css';

function PlaintextEditor({ value, handleTextArea }) {
  return (
    <TextareaAutosize
      value={value}
      onChange={handleTextArea}
      className={css.editor}
    />
  );
}

PlaintextEditor.propTypes = {
  value: PropTypes.object,
  handleTextArea: PropTypes.func
};

export default PlaintextEditor;
