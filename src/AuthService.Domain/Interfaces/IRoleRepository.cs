using AuthService.Domain.Entities;

namespace AuthService.Domain.Interfaces;

public interface IRoleRepository
{
    Task<Role?> GetByNameAsync(string name);
    Task<int> CountAdministratorsInRoleAsync(string roleId);
    //Los usuarios que tienen ese rol
    Task<IReadOnlyList<Administrator>> GetAdministratorByRoleAsync(string roleId); 
    //Roles disponibles
    Task<IReadOnlyList<string>> GetAdministratorRoleNameAsync(string administratorId); 
}