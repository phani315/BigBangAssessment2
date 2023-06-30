using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LoginandRegistration.Models
{
    public class User
    {

        
        public int UserId { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordKey { get; set; }
        public string? Role { get; set; }
    }
}
