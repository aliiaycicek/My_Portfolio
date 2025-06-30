using AutoMapper;
using PortfolioAPI.Data.Repositories;
using PortfolioAPI.Models.DTOs;
using PortfolioAPI.Models.Entities;

namespace PortfolioAPI.Controllers;

public class ProjectsController : BaseController<Project, ProjectDTO>
{
    public ProjectsController(IGenericRepository<Project> repository, IMapper mapper)
        : base(repository, mapper)
    {
    }
} 