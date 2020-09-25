using BackEndProject.Data;
using BackEndProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : Controller
    {
        private readonly ConfigurationDbContext _context;
        public StudentController(ConfigurationDbContext context)
        {
            _context = context;
        }

        // GET: Students
        [Route("list")]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return View(await _context.Student.ToListAsync());
        }

        [HttpGet]
        public IActionResult GetStudents()
        {
            var data = _context.Student.ToList();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public IActionResult GetStudent(int id)
        {
            var data = _context.Student.FirstOrDefault(c => c.ID == id);
            if (data == null)
            {
                return NotFound();
            }

            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(Student obj)
        {
            _context.Student.Add(obj);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, Student obj)
        {
            if (id != obj.ID)
            {
                return NotFound();
            }

            _context.Entry(obj).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Student>> DeleteStudent(int id)
        {
            var todoItem = await _context.Student.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Student.Remove(todoItem);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
