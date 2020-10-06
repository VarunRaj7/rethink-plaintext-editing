import React from 'react';
import PropTypes from 'prop-types';
import MEDitor from '@uiw/react-md-editor';
// import css from './style.css';

function MarkdownPreviewer({ value }) {
  return (
    <div className="container">
      <MEDitor.Markdown source={value} />
    </div>
  );
}

MarkdownPreviewer.propTypes = {
  value: PropTypes.object
};

export default MarkdownPreviewer;
