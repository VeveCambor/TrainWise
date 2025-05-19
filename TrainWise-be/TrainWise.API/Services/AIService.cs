using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;
using TrainWise.API.Configuration;
using TrainWise.API.DTOs.Training;
using TrainWise.API.Models;

namespace TrainWise.API.Services;

public class AIService : IAIService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _apiEndpoint = "https://api.openai.com/v1/chat/completions";

    public AIService(IOptions<OpenAIConfig> config, HttpClient httpClient)
    {
        _httpClient = httpClient;
        _apiKey = config.Value.ApiKey ?? throw new InvalidOperationException("OpenAI API key not found");
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
    }

    public async Task<TrainingPlanDto> GenerateTrainingPlanAsync(UserProfile userProfile)
    {
        var prompt = GenerateTrainingPlanPrompt(userProfile);
        var response = await CallOpenAIAsync(prompt);
        
        try
        {
            return JsonSerializer.Deserialize<TrainingPlanDto>(response) 
                ?? throw new InvalidOperationException("Failed to parse AI response");
        }
        catch (JsonException ex)
        {
            throw new InvalidOperationException("Failed to parse AI response as training plan", ex);
        }
    }

    public async Task<string> GetWorkoutAdviceAsync(string question, UserProfile userProfile)
    {
        var prompt = GenerateAdvicePrompt(question, userProfile);
        return await CallOpenAIAsync(prompt);
    }

    private async Task<string> CallOpenAIAsync(string prompt)
    {
        var requestBody = new
        {
            model = "gpt-4",
            messages = new[]
            {
                new { role = "system", content = "Jsi fitness trenér a odborník na zdravý životní styl." },
                new { role = "user", content = prompt }
            },
            temperature = 0.7
        };

        var response = await _httpClient.PostAsync(
            _apiEndpoint,
            new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json")
        );

        if (!response.IsSuccessStatusCode)
        {
            throw new HttpRequestException($"OpenAI API request failed: {response.StatusCode}");
        }

        var responseContent = await response.Content.ReadAsStringAsync();
        var responseObject = JsonSerializer.Deserialize<OpenAIResponse>(responseContent);
        
        return responseObject?.Choices?.FirstOrDefault()?.Message?.Content 
            ?? throw new InvalidOperationException("Empty response from OpenAI API");
    }

    private string GenerateTrainingPlanPrompt(UserProfile userProfile)
    {
        return $@"Vytvoř týdenní tréninkový plán pro následujícího uživatele:
- Úroveň: {userProfile.Level}
- Cíl: {userProfile.Goal}
- Místo tréninku: {userProfile.WorkoutLocation}
- Typ tréninku: {userProfile.WorkoutType}
- Zdravotní omezení: {userProfile.HealthLimitations}

Odpověď musí být ve formátu JSON podle následující struktury:
{{
    ""name"": ""string"",
    ""description"": ""string"",
    ""duration"": ""string"",
    ""items"": [
        {{
            ""day"": ""string"",
            ""exercises"": [
                {{
                    ""name"": ""string"",
                    ""sets"": number,
                    ""reps"": ""string"",
                    ""rest"": ""string"",
                    ""notes"": ""string""
                }}
            ]
        }}
    ]
}}";
    }

    private string GenerateAdvicePrompt(string question, UserProfile userProfile)
    {
        return $@"Uživatel s následujícími parametry:
- Úroveň: {userProfile.Level}
- Cíl: {userProfile.Goal}
- Místo tréninku: {userProfile.WorkoutLocation}
- Typ tréninku: {userProfile.WorkoutType}
- Zdravotní omezení: {userProfile.HealthLimitations}

Položil následující otázku: {question}

Odpověz stručně a odborně.";
    }
}

public class OpenAIResponse
{
    public List<Choice> Choices { get; set; } = new();
}

public class Choice
{
    public Message Message { get; set; } = new();
}

public class Message
{
    public string Content { get; set; } = string.Empty;
} 