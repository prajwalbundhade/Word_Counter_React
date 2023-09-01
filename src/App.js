import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import React, { useState } from 'react';
import Alert from './components/Alert';

import { BrowserRouter as Router,Routes, Route, } from 'react-router-dom';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
     <Router>
     
    <Navbar title="Word Counter" aboutpage="About" />
    <Alert alert={alert}/>
    
     
      <div className="container my-6">
      
      <Routes>
          <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Enter the text below"/>} />
          <Route exact path="/about" element={<About/>} />
          
        </Routes>
      </div>
      </Router>
    </>
  );
}

export default App;
