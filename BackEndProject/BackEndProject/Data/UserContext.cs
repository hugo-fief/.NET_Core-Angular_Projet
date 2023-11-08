using BackEndProject.Model;
using Microsoft.EntityFrameworkCore;

namespace BackEndProject.Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options) { }
        public DbSet<User> Users { get; set; } 
    }
}
