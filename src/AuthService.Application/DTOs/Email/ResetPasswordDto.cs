using System.ComponentModel.DataAnnotations;

namespace AuthService.Application.DTOs.Email;

public class ResetPasswordDto
{
    [Required(ErrorMessage = "El email es obligatorio")]

    public string Email { get; set; } = string.Empty;
    [Required(ErrorMessage = "El token es obligatorio")]

    public string ResetToken { get; set; } = string.Empty;
    [Required(ErrorMessage = "La nueva contrase;a es obligatoria")]
    [MinLength(8, ErrorMessage = "La contrase;a debe tener al menos 8 caracteres")]

    public string NewPassword { get; set; } = string.Empty;
}