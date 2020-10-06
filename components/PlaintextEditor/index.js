import React from 'react';
import PropTypes from 'prop-types';
import { TextareaAutosize } from '@material-ui/core';

import css from './style.css';

function PlaintextEditor({ value, handleValue }) {
  return (
    <TextareaAutosize
      value={value}
      onChange={e => handleValue(e.target.value)}
      className={css.editor}
    />
  );
}

PlaintextEditor.propTypes = {
  value: PropTypes.object,
  handleValue: PropTypes.func
};

export default PlaintextEditor;
