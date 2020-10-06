import React from 'react';
import '../styles/global.css';
import 'react-markdown-editor-lite/lib/index.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
