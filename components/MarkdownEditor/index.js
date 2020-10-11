import React from 'react';
import PropTypes from 'prop-types';
import SimpleMDE from 'react-simplemde-editor';
import css from './style.module.css';

function MarkdownEditor({ value, handleValue, ftype }) {
  console.log(`${ftype}`);
  return (
    <div className={css.editor}>
      <SimpleMDE onChange={handleValue} value={value} />
    </div>
  );
}

// style={{
//   height: '500px'
// }}

MarkdownEditor.propTypes = {
  value: PropTypes.object,
  handleValue: PropTypes.func,
  ftype: PropTypes.string
};

export default MarkdownEditor;
