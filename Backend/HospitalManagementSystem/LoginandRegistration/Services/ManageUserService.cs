using LoginandRegistration.Interfaces;
using LoginandRegistration.Models.DTO;
using LoginandRegistration.Models;
using System.Security.Cryptography;
using System.Text;

namespace LoginandRegistration.Services
{

    public class ManageUserService : IManageUser
    {
        private readonly IRepo<User, int> _userRepo;
        private readonly IRepo<Admin, int> _adminRepo;
        private readonly IRepo<Patient, int> _patientRepo;

        private readonly IGenerateToken _tokenService;

        public ManageUserService(
                                 IRepo<User, int> userRepo,
                                 IGenerateToken tokenService, IRepo<Admin, int> adminrepo, IRepo<Patient, int> patientRepo, IRepo<Doctor, int> doctorRepo)
        {
            _userRepo = userRepo;
            _tokenService = tokenService;
            _adminRepo = adminrepo;
            _patientRepo = patientRepo;
        }
        public async Task<UserDTO> Login(UserDTO userDTO)
        {
            UserDTO user = null;
            var userData = await _userRepo.Get(userDTO.UserId);
            if (userData != null)
            {
                var hmac = new HMACSHA512(userData.PasswordHash);
                var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));
                for (int i = 0; i < userPass.Length; i++)
                {
                    if (userPass[i] != userData.PasswordKey[i])
                        return null;
                }
                user = new UserDTO();
                user.UserId = userData.UserId;
                user.Role = userData.Role;
                user.Token = _tokenService.GenerateToken(user);
            }
            return user;
        }

        public async Task<UserDTO> AdminRegistration(AdminDTO user)
        {
            UserDTO myUser = null;
            var hmac = new HMACSHA512();
            user.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.PasswordClear ?? "1234"));
            user.Users.PasswordKey = hmac.Key;
            user.Users.Role = "Admin";

            var users = await _adminRepo.GetAll();
            if (users != null)
            {
                var myAdminUser = users.FirstOrDefault(u => u.Email == user.Email && u.PhoneNumber == user.PhoneNumber);
                if (myAdminUser != null)
                {
                    return null;
                }
            }
            var userResult = await _userRepo.Add(user.Users);
            var adminResult = await _adminRepo.Add(user);
            if (userResult != null && adminResult != null)
            {
                myUser = new UserDTO();
                myUser.UserId = adminResult.AdminId;
                myUser.Role = userResult.Role;
                myUser.Token = _tokenService.GenerateToken(myUser);
            }
            return myUser;
        }




        public async Task<UserDTO> PatientRegistration(PatientDTO user)
        {
            UserDTO myUser = null;
            var hmac = new HMACSHA512();
            user.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.PasswordClear ?? "1234"));
            user.Users.PasswordKey = hmac.Key;
            user.Users.Role = "patient";

            var users = await _patientRepo.GetAll();
            if (users != null)
            {
                var myAdminUser = users.FirstOrDefault(u => u.EmailId == user.EmailId && u.PhoneNumber == user.PhoneNumber);
                if (myAdminUser != null)
                {
                    return null;
                }
            }
            var userResult = await _userRepo.Add(user.Users);
            var patientResult = await _patientRepo.Add(user);
            if (userResult != null && patientResult != null)
            {
                myUser = new UserDTO();
                myUser.UserId = patientResult.PatientId;
                myUser.Role = userResult.Role;
                myUser.Token = _tokenService.GenerateToken(myUser);
            }
            return myUser;
        }



    }
}
