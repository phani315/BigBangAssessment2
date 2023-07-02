import React from "react";
import { useEffect,useState } from "react";
import './PatientLandingPage.css'
function PatientLandingPage(){

    const [doctor, SetactiveDoctors] = useState([]);

    const GetAllDoctors= async () => {
        try {
          const response = await fetch('https://localhost:7132/api/Doctor/GetAllctors');
          const data = await response.json();
          const active = data.filter(user => user.status=="approved");
          SetactiveDoctors(active);


        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        GetAllDoctors();
      }, []);
    
    return(


        <div>
  <div className='leave-table'>
  <table>
      <thead>
        <tr>
          <th>Doctor Name</th>
          <th>Specialization</th>
          <th>Experience</th>
      
       
        </tr>
      </thead>
      <tbody>
        {doctor.map((item) => (
          
          <tr key={item.doctorId}>
            <td>{item.name}</td>
            <td>{item.specialization}</td>
            <td>{item.experience}</td>
           
          </tr>
          
        ))}
      </tbody>
    </table>
  
</div>
        </div>
    )




}
export default PatientLandingPage;