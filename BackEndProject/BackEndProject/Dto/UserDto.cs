using System;

namespace BackEndProject.Dto
{
    public class UserDto
    {
        public int? Id { get; set; }
        public string Surname { get; set; }
        public string GivenName { get; set; }
        public DateTime Date { get; set; }
    }
}
