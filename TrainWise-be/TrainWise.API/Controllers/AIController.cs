using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TrainWise.API.DTOs.Training;
using TrainWise.API.Services;

namespace TrainWise.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AIController : ControllerBase
{
    private readonly IAIService _aiService;
    private readonly ITrainingService _trainingService;

    public AIController(IAIService aiService, ITrainingService trainingService)
    {
        _aiService = aiService;
        _trainingService = trainingService;
    }

    [HttpPost("generate-plan")]
    public async Task<ActionResult<TrainingPlanDto>> GenerateTrainingPlan()
    {
        try
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new UnauthorizedAccessException());
            var userProfile = await _trainingService.GetUserProfileAsync(userId);
            
            var plan = await _aiService.GenerateTrainingPlanAsync(userProfile);
            return Ok(plan);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Nepodařilo se vygenerovat tréninkový plán.", error = ex.Message });
        }
    }

    [HttpPost("advice")]
    public async Task<ActionResult<string>> GetWorkoutAdvice([FromBody] string question)
    {
        try
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new UnauthorizedAccessException());
            var userProfile = await _trainingService.GetUserProfileAsync(userId);
            
            var advice = await _aiService.GetWorkoutAdviceAsync(question, userProfile);
            return Ok(new { advice });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Nepodařilo se získat radu.", error = ex.Message });
        }
    }
} 