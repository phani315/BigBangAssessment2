import React from 'react';
import './LandingPage.css';
import ManageDoctors from '../ManageDoctors/ManageDoctors';
import logo from "../Images/download.png"
import {setData,useEffect,useState} from 'react';
import Card from './DoctorProfileCard';
import doctorimg from '../Images/doctor.png'
import patientimg from "../Images/hospitalisation.png"
import doctorpic from "../Images/doctor2.png";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";

function AdminLandingPage() {

    const [cards, setCards] = useState([]);
    const [CountOfInactiveDoctors ,SetInactiveDoctors]=useState(0);
    const [CountOfactiveDoctors ,SetactiveDoctors]=useState(0);
    const [CountOfPatients ,SetPatientsCount]=useState(0);


    const GetAllDoctors= async () => {
        try {
          const response = await fetch('https://localhost:7132/api/Doctor/GetAllctors');
          const data = await response.json();
          setCards(data);
          const inactive = data.filter(user => user.status=="Inactive").length;
          SetInactiveDoctors(inactive);
          const active = data.filter(user => user.status=="approved").length;
          SetactiveDoctors(active);


        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        GetAllDoctors();
      }, []);


      const GetAllPatients= async () => {
        try {
          const response = await fetch('https://localhost:7132/api/Patient/GetAllPatients');
          const data = await response.json();
          setCards(data);
          const patients = data.length;
          SetPatientsCount(patients)
        


        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        GetAllDoctors();
        GetAllPatients();
      }, []);

  return (
    <div class="adminlandingpage">

<nav className="navbar">
      <div className="navbar-logo">
       
        <a href="/">Lifeline Hospital</a>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
        <Link to="/managedoctors" className="link"> ManageDoctors </Link>
        </li>
        <li className="navbar-item">
          <a href="/">Logout</a>
        </li>
       
      </ul>
    </nav>
    <div>
  <br/>
  <div class="dashboard">
  <div className="card">
      <div className="card-content">
        <img class="iconimg"src={doctorimg}></img>
        <h3 className="card-title-landingpage">Active Doctors</h3>
        <p className="card-description-count">{CountOfactiveDoctors}</p>
      </div>
    </div>

    <div className="card">
      <div className="card-content">
      <img class="iconimg"src={doctorpic}></img>

        <h3 className="card-title-landingpage">Inactive Doctors</h3>
        <p className="card-description-count">{CountOfInactiveDoctors}</p>
      </div>
    </div>

    
    <div className="card">
      <div className="card-content">
      <img class="iconimg"src={patientimg}></img>

        <h3 className="card-title-registeredpatient">Registered Patients</h3>
        <p className="card-description-count">{CountOfPatients}</p>
      </div>
    </div>
  

  </div>
  
   
<div className='doctorlist'>



  <div className="card-container">
      {cards.filter(item=> item.status =="approved").map(card => (
        <Card c={card}/>
      ))}
    </div>
</div>
</div>

    
    
    
    


    </div>
   



  );
}

export default AdminLandingPage;
