import React from 'react';
import RouterMain from './RouterMain';
import { BrowserRouter } from 'react-router-dom';

const Root = () => {
    return (
        <div>
          <BrowserRouter>
            <RouterMain/>
          </BrowserRouter>  
        </div>
    );
};

export default Root;