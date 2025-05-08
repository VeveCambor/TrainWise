using System.ComponentModel.DataAnnotations;

namespace TrainWise.API.DTOs.Training;

public class TrainingPlanDto
{
    public int Id { get; set; }
    
    [Required]
    [MinLength(3)]
    public string Name { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime? LastModifiedAt { get; set; }
    
    public bool IsActive { get; set; }
    
    public List<TrainingItemDto> TrainingItems { get; set; } = new();
}

public class CreateTrainingPlanDto
{
    [Required]
    [MinLength(3)]
    public string Name { get; set; } = string.Empty;
    
    public List<CreateTrainingItemDto> TrainingItems { get; set; } = new();
}

public class UpdateTrainingPlanDto
{
    [Required]
    [MinLength(3)]
    public string Name { get; set; } = string.Empty;
    
    public bool IsActive { get; set; }
    
    public List<CreateTrainingItemDto> TrainingItems { get; set; } = new();
} 