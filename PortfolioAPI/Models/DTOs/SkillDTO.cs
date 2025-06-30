namespace PortfolioAPI.Models.DTOs;

public class SkillDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Category { get; set; } = null!;
    public int? ProficiencyLevel { get; set; }
    public string? IconUrl { get; set; }
} 