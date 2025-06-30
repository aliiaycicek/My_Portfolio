namespace PortfolioAPI.Models.DTOs;

public class EducationDTO
{
    public int Id { get; set; }
    public string School { get; set; } = null!;
    public string Department { get; set; } = null!;
    public string? Program { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Description { get; set; }
    public string? Courses { get; set; }
} 