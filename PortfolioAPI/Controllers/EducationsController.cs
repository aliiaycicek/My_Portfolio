using AutoMapper;
using PortfolioAPI.Data.Repositories;
using PortfolioAPI.Models.DTOs;
using PortfolioAPI.Models.Entities;

namespace PortfolioAPI.Controllers;

public class EducationsController : BaseController<Education, EducationDTO>
{
    public EducationsController(IGenericRepository<Education> repository, IMapper mapper)
        : base(repository, mapper)
    {
    }
} 