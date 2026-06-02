namespace Practicas.API.DTOs.Authentication
{
    public class LoginResponseDto
    {
        public Guid Id { get; set; }
        public string Role { get; set; } = string.Empty;
    }
}
