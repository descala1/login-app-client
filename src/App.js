import React from 'react';
import { Router } from 'react-router-dom';

//Styles
import './assets/css/default.css';
import './assets/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

//History
import history from './services/history';

//Routes
import Routes from './routes/router';

import Navbar from './components/Navbar';

function App() {
  return (
    <Router history={history}>
      <Navbar />
      <Routes />
    </Router>
  );
}

export default App;