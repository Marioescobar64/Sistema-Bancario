using AuthService.Domain.Entities;
using AuthService.Domain.Interfaces;
using AuthService.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Persistence.Repositories;

public class RoleRepository : IRoleRepository
{
    private readonly ApplicationDbContext _context;

    // Inyectamos el contexto de la base de datos
    public RoleRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Role?> GetByNameAsync(string name)
    {
        return await _context.Roles
            .Include(r => r.AdministratorRoles)
            .FirstOrDefaultAsync(r => r.Name == name);
    }

    // Corregido el nombre: CountAdministratorsInRoleAsync (con 's') 
    // y usando roleId como pide la interfaz
    public async Task<int> CountAdministratorsInRoleAsync(string roleId)
    {
        return await _context.AdministratorRoles
            .Where(ur => ur.RoleId == roleId) 
            .CountAsync();
    }

    // Ajustado para que reciba roleId y devuelva la lista correctamente
    public async Task<IReadOnlyList<Administrator>> GetAdministratorByRoleAsync(string roleId)
    {
        var administrators = await _context.AdministratorRoles
            .Where(ur => ur.RoleId == roleId)
            .Select(ur => ur.Administrator)
            .Include(u => u.AdministratorProfile)
            .Include(u => u.AdministratorEmail)
            .Include(u => u.AdministratorRoles)
                .ThenInclude(ur => ur.Role)
            .ToListAsync();

        return administrators.AsReadOnly();
    }

    // Corregido el nombre: GetAdministratorRoleNameAsync (sin la 's' al final de Name)
    public async Task<IReadOnlyList<string>> GetAdministratorRoleNameAsync(string administratorId)
    {
        var roles = await _context.AdministratorRoles
            .Where(ur => ur.AdministratorId == administratorId)
            .Select(ur => ur.Role.Name)
            .ToListAsync();

        return roles.AsReadOnly();
    }
}