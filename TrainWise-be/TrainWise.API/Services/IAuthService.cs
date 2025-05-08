using TrainWise.API.DTOs.Auth;

namespace TrainWise.API.Services;

public interface IAuthService
{
    Task<LoginResponseDto> RegisterAsync(RegisterRequestDto request);
    Task<LoginResponseDto> LoginAsync(LoginRequestDto request);
} 