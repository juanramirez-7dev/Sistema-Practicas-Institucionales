namespace Practicas.API.DTOs.Authentication
{
    public class LoginResponseDto
    {
        public Guid Id { get; set; }
        public string Rol { get; set; } = string.Empty;
    }
}
