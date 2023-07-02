import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../src/Components/Main/Main';
import Login from '../src/Components/LoginandSignUp/login';
import AdminLandingPage from './Components/Admin/Landingpage';
import ManageDoctors from './Components/ManageDoctors/ManageDoctors';
import LandingPage from './Components/Admin/Landingpage'; 
import PatientLandingPage from './Components/PatientLandingPage/PatientLandingPage';
import Register from './Components/Register/Register';
function App() {
  return (
    <BrowserRouter>



   
{/*         
    
    <Routes>
    <Route path="/" element={ <AdminLandingPage/>}/> 

    <Route path="managedoctors" element={<ManageDoctors/>}/> 

    </Routes> */}
    <Routes>
    <Route path='/' element={<Login/>}/>
      <Route path='/landingPage' element={<LandingPage/>}/>
      <Route path='/managedoctors' element={<ManageDoctors/>}/>
      <Route path='/patientlandingpage' element={<PatientLandingPage/>}/>
      <Route path='/register' element={<Register/>}/>

      


    </Routes>
     
   </BrowserRouter>
  );
}

export default App;
