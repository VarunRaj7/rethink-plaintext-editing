import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import css from './style.module.css';

function MarkdownPreviewer({ value }) {
  return (
    <div>
      <ReactMarkdown source={value} className={css.content} />
    </div>
  );
}

MarkdownPreviewer.propTypes = {
  value: PropTypes.object
};

export default MarkdownPreviewer;
