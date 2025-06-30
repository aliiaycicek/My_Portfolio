using System;
namespace PortfolioAPI.Models.Entities;

public class Experience : BaseEntity
{
    public string Company { get; set; } = null!;
    public string Position { get; set; } = null!;
    public string Location { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string Description { get; set; } = null!;
    public List<string> Technologies { get; set; } = new();
    public List<string> Responsibilities { get; set; } = new();
} 