namespace PortfolioAPI.Models.Entities;

public class Project : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? GithubUrl { get; set; }
    public string? LiveUrl { get; set; }
    public List<string> Technologies { get; set; } = new();
    public List<string> Features { get; set; } = new();
    public string? ImageUrl { get; set; }
} 