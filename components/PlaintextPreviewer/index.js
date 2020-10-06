import React from 'react';
import PropTypes from 'prop-types';
// import css from '../../styles/PlaintextPreviewer.module.css';
import css from './style.module.css';

function PlaintextPreviewer({ value }) {
  return <div className={css.content}>{value}</div>;
}

PlaintextPreviewer.propTypes = {
  value: PropTypes.object
};

export default PlaintextPreviewer;
