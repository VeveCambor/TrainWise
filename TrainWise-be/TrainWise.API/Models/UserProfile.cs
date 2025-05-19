using System.ComponentModel.DataAnnotations;

namespace TrainWise.API.Models;

public class UserProfile
{
    public int Id { get; set; }
    
    public int UserId { get; set; }
    
    [Required]
    public string Gender { get; set; } = string.Empty;
    
    [Required]
    [Range(1, 120)]
    public int Age { get; set; }
    
    [Required]
    [Range(50, 300)] // cm
    public int Height { get; set; }
    
    [Required]
    [Range(20, 300)] // kg
    public int Weight { get; set; }
    
    [Required]
    public string Goal { get; set; } = string.Empty; // "weight_loss", "muscle_gain", "maintenance"
    
    [Required]
    public string Level { get; set; } = "beginner"; // "beginner", "intermediate", "advanced"
    
    [Required]
    public string WorkoutLocation { get; set; } = "gym"; // "gym", "home", "outdoor"
    
    [Required]
    public string WorkoutType { get; set; } = "strength"; // "strength", "cardio", "mixed"
    
    public string? HealthLimitations { get; set; }
    
    public string? Description { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public User User { get; set; } = null!;
    public List<TrainingPlan> TrainingPlans { get; set; } = new();
} 