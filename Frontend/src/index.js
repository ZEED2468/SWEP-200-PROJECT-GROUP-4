// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import ReactDOM from 'react-dom/client'; // Use the new 'react-dom/client' for createRoot
import ApolloProviderWrapper from './ApolloProvider';
import './index.css';
import * as serviceWorker from './serviceWorker'; // Import the service worker

// Get the root element where the app will be rendered
const container = document.getElementById('root');

// Create a root using 'createRoot' from 'react-dom/client'
const root = ReactDOM.createRoot(container);

// Render the ApolloProviderWrapper that includes the App
root.render(<ApolloProviderWrapper />);

// If you want the app to work offline, you can enable the service worker.
serviceWorker.register();


