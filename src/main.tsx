import React from 'react'
import {createRoot} from 'react-dom/client'

import Router from './utils/router'
import './main.scss';


const App = () => {
  return  <Router/>
}

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<React.StrictMode><App /></React.StrictMode>);