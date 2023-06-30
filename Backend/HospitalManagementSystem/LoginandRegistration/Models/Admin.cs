﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoginandRegistration.Models
{
    public class Admin
    {
        public int AdminId { get; set; }
        [ForeignKey("UserId")]
        public Users? Users { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [MinLength(4, ErrorMessage = "Name must be atleast 4 characters long")]
        public string? Name  { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string? Email { get; set; }

    }
}
