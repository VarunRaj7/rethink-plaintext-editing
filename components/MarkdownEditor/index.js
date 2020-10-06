import React from 'react';
import PropTypes from 'prop-types';
import MEDitor from '@uiw/react-md-editor';
// import css from './style.css';

function MarkdownEditor({ value, handleValue }) {
  return (
    <div className="container">
      <MEDitor value={value} onChange={handleValue} />
      <div style={{ padding: '50px 0 0 0' }} />
    </div>
  );
}

MarkdownEditor.propTypes = {
  value: PropTypes.object,
  handleValue: PropTypes.func
};

export default MarkdownEditor;
