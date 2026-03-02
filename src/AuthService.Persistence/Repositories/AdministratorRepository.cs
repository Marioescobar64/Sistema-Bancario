using AuthService.Application.Services;
using AuthService.Domain.Interfaces;
using AuthService.Domain.Entities;
using AuthService.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Persistence.Repositories;

public class AdministratorRepository(ApplicationDbContext context) : IAdministratorRepository
{
    //Forma en la que va a mostrar el usuario, con sus relaciones,
    //para que se pueda usar en el servicio de autenticación
    public async Task<Administrator> GetByIdAsync(string id)
    {
        //Incluye las relaciones necesarias para obtener toda la información del usuario
        var administrator = await context.Administrators
        .Include(u => u.AdministratorProfile)
        .Include(u => u.AdministratorEmail)
        .Include(u => u.AdministratorPasswordReset)
        .Include(u => u.AdministratorRoles)
        .FirstOrDefaultAsync(u => u.Id == id);

        return administrator ?? throw new InvalidOperationException($"Administrator with id {id} not found.");
    }


    //Obtiene un usuario por su email, incluyendo las relaciones necesarias para obtener toda la información del usuario
    public async Task<Administrator?> GetByEmailAsync(string email)
    {
        //Incluye las relaciones necesarias para obtener toda la información del usuario
        var administrator = await context.Administrators
        .Include(u => u.AdministratorProfile)
        .Include(u => u.AdministratorEmail)
        .Include(u => u.AdministratorPasswordReset)
        .Include(u => u.AdministratorRoles)
        .ThenInclude(ur => ur.Role)
        .FirstOrDefaultAsync(u => EF.Functions.ILike(u.Email, email));

        return administrator;

    }

    //Obtiene un usuario por su administratorname, incluyendo las relaciones necesarias para obtener toda la información del usuario
    public async Task <Administrator?> GetByAdministratornameAsync(string administratorname)
    {
        return await context.Administrators
        .Include(u => u.AdministratorProfile)
        .Include(u => u.AdministratorEmail)
        .Include(u => u.AdministratorPasswordReset)
        .Include(u => u.AdministratorRoles)
        .ThenInclude(ur => ur.Role)
        .FirstOrDefaultAsync(u => EF.Functions.ILike(u.Administratorname, administratorname));

    }

    //Obtiene un usuario por su token de verificación de email, incluyendo las relaciones necesarias para obtener toda la información del usuario
    public async Task<Administrator?> GetByEmailVerificationTokenAsync(string token)
    {
        return await context.Administrators
        .Include(u => u.AdministratorProfile)
        .Include(u => u.AdministratorEmail)
        .Include(u => u.AdministratorPasswordReset)
        .Include(u => u.AdministratorRoles)
        .ThenInclude(ur => ur.Role)
        .FirstOrDefaultAsync(u => u.AdministratorEmail != null &&
                            u.AdministratorPasswordReset.PasswordResetToken == token);
    }

    public async Task<Administrator?> GetByPasswordResetTokenAsync(string token)
{
    return await context.Administrators
        .Include(u => u.AdministratorProfile)
        .Include(u => u.AdministratorEmail)
        .Include(u => u.AdministratorPasswordReset)
        .Include(u => u.AdministratorRoles)
        .ThenInclude(ur => ur.Role)
        .FirstOrDefaultAsync(u =>
            u.AdministratorPasswordReset != null &&
            u.AdministratorPasswordReset.PasswordResetToken == token);
}

    //Crea un nuevo usuario, guardando los cambios y luego obteniendo el usuario creado para devolverlo
    public async Task<Administrator> CreateAsync(Administrator administrator)
    {
        context.Administrators.Add(administrator);
        await context.SaveChangesAsync();
        return await GetByIdAsync(administrator.Id);
    }

    //Actualiza un usuario, guardando los cambios y luego obteniendo el usuario actualizado para devolverlo
    public async Task<Administrator> UpdateAsync(Administrator administrator)
    {
        await context.SaveChangesAsync();
        return await GetByIdAsync(administrator.Id);
    }

    //Elimina un usuario, primero obteniendo el usuario para asegurarse de que existe, luego eliminándolo y guardando los cambios
    public async Task<bool> DeleteAsync(string id)
    {
        var administrator = await GetByIdAsync(id);
        context.Administrators.Remove(administrator);
        await context.SaveChangesAsync();
        return true;
    }

    //Verifica si existe un usuario con el email o administratorname dado, para evitar duplicados
    public async Task<bool> ExistsByEmailAsync(string email)
    {
        return await context.Administrators
            .AnyAsync(u => EF.Functions.ILike(u.Email, email));
    }

    public async Task<bool> ExistsByAdministratornameAsync(string administratorname)
    {
        return await context.Administrators
            .AnyAsync(u => EF.Functions.ILike(u.Administratorname, administratorname));
    }

    //Cambia el rol del usuario, eliminando los roles anteriores y asignando el nuevo rol
    public async Task UpdateAdministratorRoleAsync(string administratorId, string roleId)
    {
        var existingRoles = await context.AdministratorRoles
        .Where(ur => ur.AdministratorId == administratorId)
        .ToListAsync();

        context.AdministratorRoles.RemoveRange(existingRoles);

        var newAdministratorRole = new AdministratorRole
        {
            Id = UuidGenerator.GenerateAdministratorId(),
            AdministratorId = administratorId,
            RoleId = roleId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        context.AdministratorRoles.Add(newAdministratorRole);
        await context.SaveChangesAsync();
    }
}

