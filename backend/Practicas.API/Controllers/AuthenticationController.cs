using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practicas.API.DTOs.Authentication;
using Practicas.Domain.Entities;
using Practicas.Domain.Interfaces.Services;
using System.Security.Claims;

namespace Practicas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authService;
        public AuthenticationController(IAuthenticationService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login(LoginDto dto)
        {
            try
            {
                var result = await _authService.LoginAsync(dto.Login, dto.Password);
                Response.Cookies.Append("access_token", result.Token, new CookieOptions
                  {
                      HttpOnly = true,
                      Secure = true,
                      SameSite = SameSiteMode.Strict,
                      Expires = DateTimeOffset.UtcNow.AddHours(2)
                  }
                );
                var response = new LoginResponseDto
                {
                    Id = result.UserId,
                    Rol = result.Role
                };
                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("access_token");

            return Ok();
        }

        [HttpGet("me")]
        [Authorize]
        public IActionResult Me()
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (id == null || role == null)
            {
                return Unauthorized();
            }

            return Ok(new
            {
                Id = id,
                Rol = role
            });
        }
    }
}