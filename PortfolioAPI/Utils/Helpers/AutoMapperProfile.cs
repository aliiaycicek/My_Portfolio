using AutoMapper;
using PortfolioAPI.Models.DTOs;
using PortfolioAPI.Models.Entities;

namespace PortfolioAPI.Utils.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Education, EducationDTO>().ReverseMap();
        CreateMap<Experience, ExperienceDTO>().ReverseMap();
        CreateMap<Project, ProjectDTO>().ReverseMap();
        CreateMap<Skill, SkillDTO>().ReverseMap();
    }
} 