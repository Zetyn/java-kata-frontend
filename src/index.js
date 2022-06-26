import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/style/App.css";
import "../src/style/header.css";
import "../src/style/container.css";
import "../src/style/media.css";
import "../src/style/button.css";
import "../src/style/tabs.css";
import "../src/style/page.css";
import "../src/style/profile.css";
import "../src/style/choices.css";
import "../src/style/uploader.css";
import "../src/style/section.css";
import "../src/style/search.css";
import "../src/style/menu.css";
import "../src/style/form.css";
import "../src/style/search-genres.css";
import "../src/style/footer.css";
import "../src/style/authorization.css";
import "../src/style/reader.css";
import "../src/style/ads.css";

ReactDOM.render(
     <React.StrictMode>
         <App />
     </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
