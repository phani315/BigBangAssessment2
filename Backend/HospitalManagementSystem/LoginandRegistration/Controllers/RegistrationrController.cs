﻿using LoginandRegistration.Interfaces;
using LoginandRegistration.Models;
using LoginandRegistration.Models.DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LoginandRegistration.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IManageUser _manageUser;
        private readonly IManageDoctors _managedoctor;



        public RegistrationController(IManageUser manageUser,IManageDoctors managedoctor)
        {
            _manageUser = manageUser;
            _managedoctor = managedoctor;
        }

        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<ActionResult<UserDTO>> RegisterAsDoctor(DoctorDTO doctorDTO)
        {
            var result = await _managedoctor.DoctorRegistration(doctorDTO);
            if (result != null)
                return Ok(result);
            return BadRequest("Unable to register at this moment");
        }


        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<ActionResult<UserDTO>> RegisterAsPatient(PatientDTO patientDTO)
        {
            var result = await _manageUser.PatientRegistration(patientDTO);
            if (result != null)
                return Ok(result);
            return BadRequest("Unable to register at this moment");
        }

        [HttpPost("Login")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO>> Login(UserDTO userDTO)
        {
            var result = await _manageUser.Login(userDTO);
            if (result != null)
                return Ok(result);
            return BadRequest("Invalid credentials");

        }

        [HttpPut("Update Doctor Status")]
        [ProducesResponseType(typeof(Doctor), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Doctor>> UpdateDoctorStatus(StatusDTO statusDTO)
        {
            if (statusDTO != null)
            {
                var result = await _managedoctor.StatusUpdate(statusDTO);
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest("Cannot update employee status right now");
            }
            return BadRequest("Enter the credentials properly");
        }
    }
}
