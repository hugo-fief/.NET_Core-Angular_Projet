using System;
using System.ComponentModel.DataAnnotations;

namespace BackEndProject.Models
{
    public class Student
    {
        [Key]
        public int? ID { get; set; }
        public string LastName { get; set; }
        public string FirstMidName { get; set; }
        public DateTime EnrollementDate { get; set; }
    }
}
