import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown/with-html';

import css from './style.module.css';

function MarkdownPreviewer({ value }) {
  return (
    <div>
      <ReactMarkdown
        source={value}
        className={css.content}
        escapeHtml={false}
      />
    </div>
  );
}

MarkdownPreviewer.propTypes = {
  value: PropTypes.object
};

export default MarkdownPreviewer;
