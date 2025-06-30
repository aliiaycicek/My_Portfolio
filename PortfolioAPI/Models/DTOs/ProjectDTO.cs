namespace PortfolioAPI.Models.DTOs;

public class ProjectDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? GithubUrl { get; set; }
    public string? LiveUrl { get; set; }
    public List<string> Technologies { get; set; } = new();
    public List<string> Features { get; set; } = new();
    public string? ImageUrl { get; set; }
} 