// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createRoot } from 'react-dom';
import App from './component/App';

const root = document.getElementById('root');
const rootElement = createRoot(root);
rootElement.render(<App />);
