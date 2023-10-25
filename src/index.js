import React from 'react';
import { render, createRoot } from 'react-dom/client'

import LibUiDemo from '../src/LibDemo.jsx';

const root = createRoot(document.getElementById('root'));

root.render(<LibUiDemo/>);

