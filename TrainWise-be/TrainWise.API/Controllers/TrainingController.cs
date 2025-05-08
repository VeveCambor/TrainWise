using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TrainWise.API.DTOs.Training;
using TrainWise.API.Services;

namespace TrainWise.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TrainingController : ControllerBase
{
    private readonly ITrainingService _trainingService;

    public TrainingController(ITrainingService trainingService)
    {
        _trainingService = trainingService;
    }

    [HttpPost("plans")]
    public async Task<ActionResult<TrainingPlanDto>> CreateTrainingPlan(CreateTrainingPlanDto request)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new UnauthorizedAccessException());
        var plan = await _trainingService.CreateTrainingPlanAsync(userId, request);
        return Ok(plan);
    }

    [HttpGet("plans")]
    public async Task<ActionResult<List<TrainingPlanDto>>> GetTrainingPlans()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new UnauthorizedAccessException());
        var plans = await _trainingService.GetTrainingPlansAsync(userId);
        return Ok(plans);
    }

    [HttpGet("plans/{id}")]
    public async Task<ActionResult<TrainingPlanDto>> GetTrainingPlan(int id)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new UnauthorizedAccessException());
        var plan = await _trainingService.GetTrainingPlanAsync(userId, id);
        return Ok(plan);
    }

    [HttpPut("plans/{id}")]
    public async Task<ActionResult<TrainingPlanDto>> UpdateTrainingPlan(int id, UpdateTrainingPlanDto request)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new UnauthorizedAccessException());
        var plan = await _trainingService.UpdateTrainingPlanAsync(userId, id, request);
        return Ok(plan);
    }

    [HttpDelete("plans/{id}")]
    public async Task<ActionResult> DeleteTrainingPlan(int id)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new UnauthorizedAccessException());
        await _trainingService.DeleteTrainingPlanAsync(userId, id);
        return NoContent();
    }

    [HttpPut("plans/{planId}/items/{itemId}/status")]
    public async Task<ActionResult<TrainingItemDto>> UpdateTrainingItemStatus(int planId, int itemId, [FromBody] bool isCompleted)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new UnauthorizedAccessException());
        var item = await _trainingService.UpdateTrainingItemStatusAsync(userId, planId, itemId, isCompleted);
        return Ok(item);
    }
} 