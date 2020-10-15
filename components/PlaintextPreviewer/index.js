import React from 'react';
import PropTypes from 'prop-types';
// import css from '../../styles/PlaintextPreviewer.module.css';
import css from './style.module.css';

function PlaintextPreviewer({ value, ftype }) {
  console.log(`${ftype}`);
  return <div className={css.content}>{value}</div>;
}

PlaintextPreviewer.propTypes = {
  value: PropTypes.string,
  ftype: PropTypes.string
};

export default PlaintextPreviewer;
