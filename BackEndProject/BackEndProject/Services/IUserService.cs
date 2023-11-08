using BackEndProject.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEndProject.Services
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAll();
        Task<UserDto> GetById(int userId);
        Task<UserDto> Create(UserDto user);

        Task<UserDto> Update(int userId, UserDto user);

        Task<bool> Delete(int userId);
    }
}
