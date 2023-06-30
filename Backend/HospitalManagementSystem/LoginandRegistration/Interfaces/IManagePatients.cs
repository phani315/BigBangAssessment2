﻿using LoginandRegistration.Models;
using LoginandRegistration.Models.DTO;

namespace LoginandRegistration.Interfaces
{
    public interface IManagePatients
    {

        public Task<UserDTO?> PatientRegistration(PatientDTO patientDTO);

        public Task<ICollection<Doctor?>> GetAllDoctorsBasedOnSpecialization(string Specialization);

    }
}
