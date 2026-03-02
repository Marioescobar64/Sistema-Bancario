using System.ComponentModel.DataAnnotations;

namespace AuthService.Domain.Entities;

public class Role
{
    [Key]
    [MaxLength(16)]
    public string Id { get; set; } = string.Empty;

    [Required(ErrorMessage = "El nombre del rol es obligatorio.")]
    [MaxLength(100, ErrorMessage = "El nombre del rol no puede exceder los 100 caracteres.")]

    public string Name { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    //Relaciones con AdministratorRole
    public ICollection<AdministratorRole> AdministratorRoles { get; set; } = [];

}

// Tabla de Roles
// +--------------+--------------+------------------+
// | Id           | Name         | Description      |
// +--------------+--------------+------------------+
// | ADMIN        | Admin        | Administrador    |
// | USER         | Administrator         | Usuario normal   |
// | GUEST        | Guest        | Invitado         |
// +--------------+--------------+------------------+