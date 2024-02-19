import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Root from './router/Root';
import {NavermapsProvider} from "react-naver-maps";
import {RecoilRoot} from "recoil";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <NavermapsProvider ncpClientId="38q1h3iyts">
        <div>
          <RecoilRoot>
            <Root/>
          </RecoilRoot>v
        </div>
    </NavermapsProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
