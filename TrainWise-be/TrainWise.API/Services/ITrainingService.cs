using TrainWise.API.DTOs.Training;

namespace TrainWise.API.Services;

public interface ITrainingService
{
    Task<TrainingPlanDto> CreateTrainingPlanAsync(int userId, CreateTrainingPlanDto request);
    Task<TrainingPlanDto> GetTrainingPlanAsync(int userId, int planId);
    Task<List<TrainingPlanDto>> GetTrainingPlansAsync(int userId);
    Task<TrainingPlanDto> UpdateTrainingPlanAsync(int userId, int planId, UpdateTrainingPlanDto request);
    Task DeleteTrainingPlanAsync(int userId, int planId);
    Task<TrainingItemDto> UpdateTrainingItemStatusAsync(int userId, int planId, int itemId, bool isCompleted);
} 