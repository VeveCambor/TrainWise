using TrainWise.API.DTOs.Training;
using TrainWise.API.Models;

namespace TrainWise.API.Services;

public interface IAIService
{
    Task<TrainingPlanDto> GenerateTrainingPlanAsync(UserProfile userProfile);
    Task<string> GetWorkoutAdviceAsync(string question, UserProfile userProfile);
} 