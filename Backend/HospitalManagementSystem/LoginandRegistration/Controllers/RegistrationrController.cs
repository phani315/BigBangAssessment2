using LoginandRegistration.Interfaces;
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
        private readonly IManageDoctors<DoctorDTO ,int>_managedoctor;

        public RegistrationController(IManageUser manageUser)
        {
            _manageUser = manageUser;
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
    }
}
