using AutoMapper;
using PortfolioAPI.Data.Repositories;
using PortfolioAPI.Models.DTOs;
using PortfolioAPI.Models.Entities;

namespace PortfolioAPI.Controllers;

public class ExperiencesController : BaseController<Experience, ExperienceDTO>
{
    public ExperiencesController(IGenericRepository<Experience> repository, IMapper mapper)
        : base(repository, mapper)
    {
    }
} 