using Microsoft.EntityFrameworkCore;
using TrainWise.API.Models;

namespace TrainWise.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<TrainingPlan> TrainingPlans { get; set; }
    public DbSet<TrainingItem> TrainingItems { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Konfigurace vztahů
        modelBuilder.Entity<User>()
            .HasOne(u => u.Profile)
            .WithOne(p => p.User)
            .HasForeignKey<UserProfile>(p => p.UserId);
            
        modelBuilder.Entity<UserProfile>()
            .HasMany(p => p.TrainingPlans)
            .WithOne(t => t.UserProfile)
            .HasForeignKey(t => t.UserProfileId);
            
        modelBuilder.Entity<TrainingPlan>()
            .HasMany(p => p.TrainingItems)
            .WithOne(i => i.TrainingPlan)
            .HasForeignKey(i => i.TrainingPlanId);
            
        // Indexy
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();
            
        // Seed data
        SeedData(modelBuilder);
    }
    
    private void SeedData(ModelBuilder modelBuilder)
    {
        // Vytvoření testovacího uživatele
        var testUser = new User
        {
            Id = 1,
            Username = "wewa",
            PasswordHash = "$2a$11$F1acQC/XaEULtTmhmmpoxeSk7eq2y35zvAIsdkVIDYe3doYb2QoIq",
            CreatedAt = new DateTime(2025, 5, 19, 18, 51, 11, 39, DateTimeKind.Utc).AddTicks(190)
        };
        
        modelBuilder.Entity<User>().HasData(testUser);
    }
} 