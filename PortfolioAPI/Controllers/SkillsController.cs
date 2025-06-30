using AutoMapper;
using PortfolioAPI.Data.Repositories;
using PortfolioAPI.Models.DTOs;
using PortfolioAPI.Models.Entities;

namespace PortfolioAPI.Controllers;

public class SkillsController : BaseController<Skill, SkillDTO>
{
    public SkillsController(IGenericRepository<Skill> repository, IMapper mapper)
        : base(repository, mapper)
    {
    }
} 