using AuthService.Domain.Entities;
using AuthService.Application.Services;
using AuthService.Domain.Constants;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Persistence.Data;

public static class DataSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // Verificar si ya existen roles
        if (!context.Roles.Any())
        {
            var roles = new List<Role>
            {
                new() {
                    Id = UuidGenerator.GenerateRoleId(),
                        Name = RoleConstants.ADMIN_ROLE
                },
                new() {
                    Id = UuidGenerator.GenerateRoleId(),
                        Name = RoleConstants.USER_ROLE
                }
            };
 
            await context.Roles.AddRangeAsync(roles);
            await context.SaveChangesAsync();
        }
 
        // Seed de un usuario administrador por defecto SOLO si no existen usuarios todavía
        if (!await context.Administrators.AnyAsync())
        {
            // Buscar rol admin existente
            var adminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == RoleConstants.ADMIN_ROLE);
            if (adminRole != null)
            {
                //var passwordHasher = new PasswordHashService();
 
                var administratorId = UuidGenerator.GenerateAdministratorId();
                var profileId = UuidGenerator.GenerateAdministratorId();
                var emailId = UuidGenerator.GenerateAdministratorId();
                var administratorRoleId = UuidGenerator.GenerateAdministratorId();
 
                var adminAdministrator = new Administrator
                {
                    Id = administratorId,
                    Name = "Admin",
                    Surname = "Administrator",
                    Administratorname = "admin",
                    Email = "admin@ksports.local",
                    //Password = passwordHasher.HashPassword("Admin1234!"),
                    Password = "12345678",
                    Status = true,
                    AdministratorProfile = new AdministratorProfile
                    {
                        Id = profileId,
                        AdministratorId = administratorId,
                        //ProfilePicture = string.Empty,
                        //Phone = string.Empty
                    },
                    AdministratorEmail = new AdministratorEmail
                    {
                        Id = emailId,
                        AdministratorId = administratorId,
                        EmailVerified = true,
                        EmailVerificationToken = null,
                        EmailVerificationTokenExpiry = null
                    },
                    AdministratorRoles =
                    [
                        new AdministratorRole
                        {
                            Id = administratorRoleId,
                            AdministratorId = administratorId,
                            RoleId = adminRole.Id
                        }
                    ]
                };
 
                await context.Administrators.AddAsync(adminAdministrator);
                await context.SaveChangesAsync();
            }
        }
    }
}