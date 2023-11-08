using AutoMapper;
using BackEndProject.Data;
using BackEndProject.Dto;
using BackEndProject.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackEndProject.Services
{
    public class UserService : IUserService
    {
        private readonly UserContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<UserService> _logger;

        public UserService(UserContext context, IMapper mapper, ILogger<UserService> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<List<UserDto>> GetAll()
        {
            try
            {
                List<User> users = await _context.Users.ToListAsync();
                return _mapper.Map<List<UserDto>>(users);
            } catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting users.");
                throw;
            }
            
        }

        public async Task<UserDto> GetById(int userId)
        {
            try
            {
                User user = await _context.Users.FindAsync(userId);

                if (user == null)
                {
                    return null;
                }

                return _mapper.Map<UserDto>(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting user with id {UserId}", userId);
                throw;
            }

        }

        public async Task<UserDto> Create(UserDto user)
        {
            try
            {
                User createdUser = _mapper.Map<User>(user);

                _context.Users.Add(createdUser);
                await _context.SaveChangesAsync();

                return _mapper.Map<UserDto>(createdUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating a user.");
                throw;
            }

        }

        public async Task<UserDto> Update(int userId, UserDto user)
        {
            try
            {
                User updatedUser = await _context.Users.FindAsync(userId);

                if (updatedUser == null)
                {
                    return null;
                }

                _mapper.Map(user, updatedUser);
                _context.Entry(updatedUser).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return _mapper.Map<UserDto>(updatedUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating user with id {UserId}", userId);
                throw;
            }

        }

        public async Task<bool> Delete(int userId)
        {
            try
            {
                User user = await _context.Users.FindAsync(userId);

                if (user == null)
                {
                    return false;
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting user with id {UserId}", userId);
                throw;
            }

        }
    }
}
