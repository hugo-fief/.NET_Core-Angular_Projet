using BackEndProject.Dto;
using BackEndProject.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEndProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<UserDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            List<UserDto> users = await _userService.GetAll();
            return Ok(users);
        }

        [HttpGet("{userId}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetById(int userId)
        {
            UserDto user = await _userService.GetById(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<UserDto>> Create(UserDto user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserDto userCreated = await _userService.Create(user);

            if (userCreated == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPut("{userId}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Update(int userId, UserDto user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserDto userUpdated = await _userService.Update(userId, user);

            if (userUpdated == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{userId}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Delete(int userId)
        {
            bool successfullyDeleted = await _userService.Delete(userId);

            if (!successfullyDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
