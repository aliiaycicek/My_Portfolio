namespace PortfolioAPI.Models.DTOs;

public class ExperienceDTO
{
    public int Id { get; set; }
    public string Company { get; set; } = null!;
    public string Position { get; set; } = null!;
    public string Location { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string Description { get; set; } = null!;
    public List<string> Technologies { get; set; } = new();
    public List<string> Responsibilities { get; set; } = new();
} 