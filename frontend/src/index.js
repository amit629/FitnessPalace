import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import '../node_modules/bootstrap/dist/js/bootstrap'
import { Provider } from 'react-redux';
import ConfStores from './reduxConf/ConfStores';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ConfStores}> 
        <React.StrictMode><App/></React.StrictMode>
          
        
  </Provider>
);

