import './App.css';
import React from 'react';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Leftbar from './components/leftbar/Leftbar';
import {BrowserRouter as Router, Route, Routes,Outlet , Navigate} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import CreateMeet from './pages/createMeeting/CreateMeet';
import Update from './pages/meetingUpdate/Update';

function App() {




  const Layout = () => {
    return(
    <div className="layout" style={{ overflowX: "hidden" }}>
       <Navbar/>
        <div style={{display: "flex"}}>
            <Leftbar />
            <div style={{flex: 6}}>
                <Outlet />
            </div>
        </div>
    </div>
    );
}

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/login' element= {<Login/>}/>
          <Route path='/register' element= {<Register/>}/>
          <Route path="/" element={<Layout />}>
                  {/* Nested routes under Layout */}
            <Route index element={<Home />} /> {/* default route */}
            <Route path='/createMeeting' element= {<CreateMeet/>}/>
            <Route path='/update' element= {<Update/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
