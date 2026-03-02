using AuthService.Domain.Entities;

namespace AuthService.Domain.Interfaces;

public interface IAdministratorRepository
{
    //Metodos de Consulta
    Task<Administrator> CreateAsync(Administrator administrator);

    Task<Administrator> GetByIdAsync(string id);

    Task<Administrator?> GetByEmailAsync(string email);

    Task<Administrator?> GetByAdministratornameAsync(string administratorname);

    Task<Administrator?> GetByEmailVerificationTokenAsync(string token);

    Task<Administrator?> GetByPasswordResetTokenAsync(string token);

    Task<bool> ExistsByEmailAsync(string email);

    Task<bool> ExistsByAdministratornameAsync(string administratorname);

    Task<Administrator> UpdateAsync(Administrator administrator);

    Task<bool> DeleteAsync(string id);

    Task UpdateAdministratorRoleAsync(string administratorId, string roleId);
    
}