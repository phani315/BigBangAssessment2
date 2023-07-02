import { useState, useEffect } from "react";
import axios from 'axios';
import './doctorlandingpage.css';
import profile from '../Images/doctor.png';
import React from "react";

function Profile() {
  const [userid, setUserId] = useState([]);
  const [user, setUser] = useState([]);

  const [updateStatus, setUpdateStatus] = useState(true);
  const [classUpdate, setClassUpdate] = useState("input");
 

  const GetAllDoctors= async () => {
    try {
      const response = await fetch('https://localhost:7132/api/Doctor/GetAllctors');
      const data = await response.json();
      const doctor = data.filter(user => user.doctorId==userid);
      console.log(doctor)
      setUser(doctor)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const userid = localStorage.getItem("userId");
    setUserId(userid)


  }, []);

  const updateDetails = async () => {
    var profileData =   { 
        "id": user.id,
        "role": "",
        "employee": {
          "id": user.id,
          "name": "Mithra",
          "dateOfBirth": "2023-06-27T10:13:03.890Z",
          "phoneNumber": user.phoneNumber,
          "age": 21,
          "emailId": "mithra@gmail.com",
          "address": user.address,
          "passportNumber": user.passportNumber,
          "drivingLicenseNumber": user.drivingLicenseNumber,
          "status": "Active"
        },
        "passwordClear": ""
      }
      console.log(profileData);
    try {
      await axios.put('http://localhost:5188/api/Employee/Update Employee Details',profileData);
      setUpdateStatus(true);
      setClassUpdate("input");
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const editDetails = () => {
    setUpdateStatus(false);
    setClassUpdate("input-update");
  };

  const CancelDetails = () => {
    setUpdateStatus(true);
    setClassUpdate("input");
  };
  useEffect(() => {
    const doctorId = localStorage.getItem("userId");
    setUser(doctorId)
    console.log(user)


  }, []);
  useEffect(() => {
    GetAllDoctors();
  }, []);


  return (
    <div className="profile">
      {user ? (
        <div>
          <div className="profile-top">
            <div className="profile-top-image">
              <img src={profile} width="200" height="200" alt="Profile" />
              <h4>Name: {user.name} </h4>
              <h5>Doctor ID: {user.doctorId} </h5>
              <h5>Phone Number {user.phoneNumber} </h5>
            </div>
            <div className="profile-top-content">
              <h5> User Details </h5>
              <div className="profile-table">
                <table className="profile-top-content-field" >
                  <tbody>
                    <tr>
                      <td>Phone Number</td>
                      <td>
                        <input
                          className={classUpdate}
                          type="tel"
                          value={user.phoneNumber}
                          onChange={(event) => { setUser({ ...user, "phoneNumber": event.target.value }) }}
                          disabled={updateStatus}
                        />
                      </td>
                    </tr>
        
                  </tbody>
                </table>
              </div>
              <div className="btn">
                {updateStatus ?
                  <button className="btn-edit" onClick={editDetails}> Edit Profile </button>
                  :
                  <div>
                    <button className="btn-update" onClick={updateDetails}> update </button>
                    <button className="btn-cancel" onClick={CancelDetails}> Cancel </button>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="profile-bottom">
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default Profile;
