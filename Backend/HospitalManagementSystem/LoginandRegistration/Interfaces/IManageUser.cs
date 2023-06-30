using LoginandRegistration.Models.DTO;

namespace LoginandRegistration.Interfaces
{
    public interface IManageUser
    {
        public Task<UserDTO?> Login(UserDTO user);
        public Task<UserDTO?> RegisterDoctor(DoctorDTO doctorDTO);
        public Task<UserDTO?> RegisterPatient(PatientDTO patientDTO);




    }
}
