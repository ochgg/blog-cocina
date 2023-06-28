import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/css/style.css'


import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es.json";

TimeAgo.addDefaultLocale(es);
TimeAgo.addLocale(es);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <App />
  
);


