import React from 'react';
import './index.css';
import App from '../src/app/App';
import Transition from './components/Transition/Transition.jsx';
import Cover from './components/Cover/Cover.tsx';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<> <App tab="home" /> <Transition /> <Cover/>  </> );