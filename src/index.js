import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {UserProvider} from './useContext/userContext'
import { Provider } from 'react-redux';
import { store } from './store/store';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <Provider store={store}>
        <UserProvider>
          <App />
        </UserProvider>
     </Provider>
    
    
  </React.StrictMode>
);
