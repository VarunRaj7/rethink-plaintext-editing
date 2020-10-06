import React from 'react';
import PropTypes from 'prop-types';
import MdEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import css from './style.module.css';

function MarkdownEditor({ value, handleValue }) {
  const handleChange = ({ html, text }) => {
    handleValue(text.replace(/\d/g, ''));
  };
  return (
    <div>
      <MdEditor
        value={value}
        onChange={handleChange}
        renderHTML={text => <ReactMarkdown source={text} />}
        className={css.editor}
      />
    </div>
  );
}

// style={{
//   height: '500px'
// }}

MarkdownEditor.propTypes = {
  value: PropTypes.object,
  handleValue: PropTypes.func
};

export default MarkdownEditor;
