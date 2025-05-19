using Microsoft.EntityFrameworkCore;
using TrainWise.API.Data;
using TrainWise.API.DTOs.Training;
using TrainWise.API.Models;

namespace TrainWise.API.Services;

public class TrainingService : ITrainingService
{
    private readonly ApplicationDbContext _context;

    public TrainingService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<UserProfile> GetUserProfileAsync(int userId)
    {
        var profile = await _context.UserProfiles
            .FirstOrDefaultAsync(p => p.UserId == userId)
            ?? throw new InvalidOperationException("Uživatelský profil nenalezen.");
            
        return profile;
    }

    public async Task<TrainingPlanDto> CreateTrainingPlanAsync(int userId, CreateTrainingPlanDto request)
    {
        var userProfile = await _context.UserProfiles
            .FirstOrDefaultAsync(p => p.UserId == userId)
            ?? throw new InvalidOperationException("Uživatelský profil nenalezen.");

        var trainingPlan = new TrainingPlan
        {
            UserProfileId = userProfile.Id,
            Name = request.Name,
            CreatedAt = DateTime.UtcNow,
            IsActive = true,
            TrainingItems = request.TrainingItems.Select(item => new TrainingItem
            {
                ExerciseName = item.ExerciseName,
                Sets = item.Sets,
                Reps = item.Reps,
                Notes = item.Notes,
                IsCompleted = false
            }).ToList()
        };

        _context.TrainingPlans.Add(trainingPlan);
        await _context.SaveChangesAsync();

        return MapToDto(trainingPlan);
    }

    public async Task<TrainingPlanDto> GetTrainingPlanAsync(int userId, int planId)
    {
        var plan = await GetTrainingPlanWithItemsAsync(userId, planId);
        return MapToDto(plan);
    }

    public async Task<List<TrainingPlanDto>> GetTrainingPlansAsync(int userId)
    {
        var plans = await _context.TrainingPlans
            .Include(p => p.UserProfile)
            .Include(p => p.TrainingItems)
            .Where(p => p.UserProfile.UserId == userId)
            .ToListAsync();

        return plans.Select(MapToDto).ToList();
    }

    public async Task<TrainingPlanDto> UpdateTrainingPlanAsync(int userId, int planId, UpdateTrainingPlanDto request)
    {
        var plan = await GetTrainingPlanWithItemsAsync(userId, planId);

        plan.Name = request.Name;
        plan.IsActive = request.IsActive;
        plan.LastModifiedAt = DateTime.UtcNow;

        // Aktualizace nebo přidání nových položek
        var existingItems = plan.TrainingItems.ToList();
        _context.TrainingItems.RemoveRange(existingItems);

        plan.TrainingItems = request.TrainingItems.Select(item => new TrainingItem
        {
            ExerciseName = item.ExerciseName,
            Sets = item.Sets,
            Reps = item.Reps,
            Notes = item.Notes,
            IsCompleted = false
        }).ToList();

        await _context.SaveChangesAsync();

        return MapToDto(plan);
    }

    public async Task DeleteTrainingPlanAsync(int userId, int planId)
    {
        var plan = await GetTrainingPlanWithItemsAsync(userId, planId);
        _context.TrainingPlans.Remove(plan);
        await _context.SaveChangesAsync();
    }

    public async Task<TrainingItemDto> UpdateTrainingItemStatusAsync(int userId, int planId, int itemId, bool isCompleted)
    {
        var plan = await GetTrainingPlanWithItemsAsync(userId, planId);
        var item = plan.TrainingItems.FirstOrDefault(i => i.Id == itemId)
            ?? throw new InvalidOperationException("Cvičení nenalezeno.");

        item.IsCompleted = isCompleted;
        await _context.SaveChangesAsync();

        return new TrainingItemDto
        {
            Id = item.Id,
            ExerciseName = item.ExerciseName,
            Sets = item.Sets,
            Reps = item.Reps,
            Notes = item.Notes,
            IsCompleted = item.IsCompleted
        };
    }

    private async Task<TrainingPlan> GetTrainingPlanWithItemsAsync(int userId, int planId)
    {
        var plan = await _context.TrainingPlans
            .Include(p => p.UserProfile)
            .Include(p => p.TrainingItems)
            .FirstOrDefaultAsync(p => p.Id == planId && p.UserProfile.UserId == userId)
            ?? throw new InvalidOperationException("Tréninkový plán nenalezen.");

        return plan;
    }

    private static TrainingPlanDto MapToDto(TrainingPlan plan)
    {
        return new TrainingPlanDto
        {
            Id = plan.Id,
            Name = plan.Name,
            CreatedAt = plan.CreatedAt,
            LastModifiedAt = plan.LastModifiedAt,
            IsActive = plan.IsActive,
            TrainingItems = plan.TrainingItems.Select(item => new TrainingItemDto
            {
                Id = item.Id,
                ExerciseName = item.ExerciseName,
                Sets = item.Sets,
                Reps = item.Reps,
                Notes = item.Notes,
                IsCompleted = item.IsCompleted
            }).ToList()
        };
    }
} 