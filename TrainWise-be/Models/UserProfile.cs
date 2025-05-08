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
    
    public string? HealthLimitations { get; set; }
    
    // Navigation properties
    public User User { get; set; } = null!;
    public List<TrainingPlan> TrainingPlans { get; set; } = new();
} 