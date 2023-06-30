using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LoginandRegistration.Models
{
    public class Users
    {

        [Key]
        public int UserId { get; set; }
        public byte[]? Password { get; set; }
        public byte[]? HashKey { get; set; }
        public string? Role { get; set; }
    }
}
