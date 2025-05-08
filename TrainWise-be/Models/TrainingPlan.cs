using System.ComponentModel.DataAnnotations;

namespace TrainWise.API.Models;

public class TrainingPlan
{
    public int Id { get; set; }
    
    public int UserProfileId { get; set; }
    
    [Required]
    public string Name { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? LastModifiedAt { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    // Navigation properties
    public UserProfile UserProfile { get; set; } = null!;
    public List<TrainingItem> TrainingItems { get; set; } = new();
} 