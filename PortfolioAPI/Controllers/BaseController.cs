using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Data.Repositories;
using PortfolioAPI.Models.Entities;

namespace PortfolioAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseController<TEntity, TDto> : ControllerBase
    where TEntity : BaseEntity
    where TDto : class
{
    protected readonly IGenericRepository<TEntity> _repository;
    protected readonly IMapper _mapper;

    protected BaseController(IGenericRepository<TEntity> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    [HttpGet]
    public virtual async Task<ActionResult<IEnumerable<TDto>>> GetAll()
    {
        var entities = await _repository.GetAllAsync();
        return Ok(_mapper.Map<IEnumerable<TDto>>(entities));
    }

    [HttpGet("{id}")]
    public virtual async Task<ActionResult<TDto>> GetById(int id)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null)
            return NotFound();

        return Ok(_mapper.Map<TDto>(entity));
    }

    [HttpPost]
    public virtual async Task<ActionResult<TDto>> Create(TDto dto)
    {
        var entity = _mapper.Map<TEntity>(dto);
        var result = await _repository.AddAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, _mapper.Map<TDto>(result));
    }

    [HttpPut("{id}")]
    public virtual async Task<ActionResult<TDto>> Update(int id, TDto dto)
    {
        if (!await _repository.ExistsAsync(id))
            return NotFound();

        var entity = _mapper.Map<TEntity>(dto);
        entity.Id = id;
        var result = await _repository.UpdateAsync(entity);
        return Ok(_mapper.Map<TDto>(result));
    }

    [HttpDelete("{id}")]
    public virtual async Task<ActionResult> Delete(int id)
    {
        if (!await _repository.ExistsAsync(id))
            return NotFound();

        await _repository.DeleteAsync(id);
        return NoContent();
    }
} 