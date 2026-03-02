namespace AuthService.Application.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailVerificationAsync(string email, string administratorname, string token);

        Task SendPasswordResetAsync(string email, string administratorname, string token);
        
        Task SendWelcomeEmailAsync(string email, string administratorname);
    }
}