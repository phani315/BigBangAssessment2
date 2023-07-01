using LoginandRegistration.Interfaces;
using LoginandRegistration.Models.DTO;
using LoginandRegistration.Models;

using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace LoginandRegistration.Controllers
{
  

        [Route("api/[controller]/[action]")]
        [ApiController]
        public class PatientController : ControllerBase
        {
            private readonly IManagePatients _managepatients;



            public PatientController(IManagePatients managepatients)
            {
            _managepatients = managepatients;
            }

        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<ActionResult<UserDTO>> RegisterAsPatient(PatientDTO patientDTO)
        {
            var result = await _managepatients.PatientRegistration(patientDTO);
            if (result != null)
                return Ok(result);
            return BadRequest("Unable to register at this moment");
        }
       



    }
}
