using LoginandRegistration.Interfaces;
using LoginandRegistration.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace LoginandRegistration.Controllers
{
  

        [Route("api/[controller]/[action]")]
        [ApiController]
        public class PatientController : ControllerBase
        {
            private readonly IManageUser _manageUser;
            private readonly IManageDoctors _managedoctor;
            private readonly IManagePatients _managepatients;



            public PatientController(IManageUser manageUser, IManageDoctors managedoctor)
            {
                _manageUser = manageUser;
                _managedoctor = managedoctor;
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
