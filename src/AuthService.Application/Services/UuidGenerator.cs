using System.Security.Cryptography;
using System.Text;
using System.Linq;

namespace AuthService.Application.Services;

public static class UuidGenerator
{
    private const string Alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public static string GenerateShortUUID()
    {
        using var rng = RandomNumberGenerator.Create();
        var bytes = new byte[12];
        rng.GetBytes(bytes);

        var result = new StringBuilder(12);

        for (int i = 0; i < 12; i++)
        {
            result.Append(Alphabet[bytes[i] % Alphabet.Length]);
        }

        return result.ToString();
    }

    public static string GenerateAdministratorId()
    {
        return $"usr_{GenerateShortUUID()}";
    }

    public static string GenerateRoleId()
    {
        return $"rol_{GenerateShortUUID()}";
    }

    public static bool IsValidAdministratorId(string administratorId)
    {
        if (string.IsNullOrEmpty(administratorId))
        {
            return false;
        }

        if (administratorId.Length != 16 || !administratorId.StartsWith("usr_"))
        {
            return false;
        }

        var idPart = administratorId[4..];
        return idPart.All(c => Alphabet.Contains(c));
    }
}