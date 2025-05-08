using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TrainWise.API.Data;
using TrainWise.API.DTOs.Auth;
using TrainWise.API.Models;

namespace TrainWise.API.Services;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<LoginResponseDto> RegisterAsync(RegisterRequestDto request)
    {
        if (await _context.Users.AnyAsync(u => u.Username == request.Username))
        {
            throw new InvalidOperationException("Uživatelské jméno je již obsazené.");
        }

        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
        {
            throw new InvalidOperationException("Email je již registrován.");
        }

        var user = new User
        {
            Username = request.Username,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return await LoginAsync(new LoginRequestDto
        {
            Username = request.Username,
            Password = request.Password
        });
    }

    public async Task<LoginResponseDto> LoginAsync(LoginRequestDto request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == request.Username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Neplatné přihlašovací údaje.");
        }

        // Aktualizace času posledního přihlášení
        user.LastLoginAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        // Generování JWT tokenu
        var token = GenerateJwtToken(user);

        return new LoginResponseDto
        {
            Token = token,
            Username = user.Username,
            ExpiresAt = DateTime.UtcNow.AddMinutes(
                int.Parse(_configuration["Jwt:ExpiryInMinutes"] ?? "60"))
        };
    }

    private string GenerateJwtToken(User user)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not found")));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                int.Parse(_configuration["Jwt:ExpiryInMinutes"] ?? "60")),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
} 