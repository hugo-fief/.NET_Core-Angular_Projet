using AutoMapper;
using BackEndProject.Dto;
using BackEndProject.Model;

namespace BackEndProject.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
