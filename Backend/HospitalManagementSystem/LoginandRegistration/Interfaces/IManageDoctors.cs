using LoginandRegistration.Models.DTO;

namespace LoginandRegistration.Interfaces
{
    public interface IManageDoctors<k,T>
    {

        public Task<UserDTO?> DoctorRegistration(DoctorDTO doctor);
        public Task<k> UpdateEmployeeStatus(StatusDTO status);
    }
}
