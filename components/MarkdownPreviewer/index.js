import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown/with-html';

import css from './style.module.css';

function MarkdownPreviewer({ value, ftype }) {
  console.log(`${ftype}`);
  return (
    <div>
      <ReactMarkdown
        source={value}
        escapeHtml={false}
        className={css.content}
      />
    </div>
  );
}

MarkdownPreviewer.propTypes = {
  value: PropTypes.object,
  ftype: PropTypes.string
};

export default MarkdownPreviewer;
