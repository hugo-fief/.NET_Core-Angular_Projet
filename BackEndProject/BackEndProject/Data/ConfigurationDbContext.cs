using BackEndProject.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEndProject.Data
{
    public class ConfigurationDbContext : DbContext
    {
        public ConfigurationDbContext(DbContextOptions<ConfigurationDbContext> options) : base(options) { }
        public DbSet<UserDto> Student { get; set; } 
    }
}
