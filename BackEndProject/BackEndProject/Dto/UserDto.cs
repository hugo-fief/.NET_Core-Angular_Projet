using System;
using System.ComponentModel.DataAnnotations;

namespace BackEndProject.Models
{
    public class UserDto
    {
        [Key]
        public int? Id { get; set; }
        public string Surname { get; set; }
        public string GivenName { get; set; }
        public DateTime Date { get; set; }
    }
}
