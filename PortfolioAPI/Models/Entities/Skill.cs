namespace PortfolioAPI.Models.Entities;

public class Skill : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Category { get; set; } = null!; // Programming Languages, Frameworks, Tools etc.
    public int? ProficiencyLevel { get; set; } // 1-5 scale
    public string? IconUrl { get; set; }
} 