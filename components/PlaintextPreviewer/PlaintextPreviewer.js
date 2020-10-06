import React from 'react';
import PropTypes from 'prop-types';
import css from './style.css';

function EditorPreviewer({ value }) {
  return value;
}

EditorPreviewer.propTypes = {
  value: PropTypes.object
};

export default EditorPreviewer;
