import React from 'react';
import '../styles/global.css';
import 'easymde/dist/easymde.min.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
