import React from 'react';
import PropTypes from 'prop-types';
import { TextareaAutosize } from '@material-ui/core';

import css from './style.module.css';

function PlaintextEditor({ value, handleValue }) {
  return (
    <div>
      <TextareaAutosize
        value={value}
        onChange={e => handleValue(e.target.value)}
        className={css.editor}
      />
    </div>
  );
}

PlaintextEditor.propTypes = {
  value: PropTypes.object,
  handleValue: PropTypes.func
};

export default PlaintextEditor;
