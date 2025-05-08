using System.ComponentModel.DataAnnotations;

namespace TrainWise.API.Models;

public class TrainingItem
{
    public int Id { get; set; }
    
    public int TrainingPlanId { get; set; }
    
    [Required]
    public string ExerciseName { get; set; } = string.Empty;
    
    [Required]
    [Range(1, 20)]
    public int Sets { get; set; }
    
    [Required]
    [Range(1, 100)]
    public int Reps { get; set; }
    
    public string? Notes { get; set; }
    
    public bool IsCompleted { get; set; } = false;
    
    // Navigation property
    public TrainingPlan TrainingPlan { get; set; } = null!;
} 