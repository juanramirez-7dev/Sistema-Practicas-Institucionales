using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practicas.API.DTOs.Proceso;
using Practicas.Domain.Interfaces.Services;
using System.Security.Claims;

namespace Practicas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcesoController : ControllerBase
    {
        private readonly IProcesoService _procesoService;
        protected Guid UsuarioId => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);


        public ProcesoController(IProcesoService procesoService)
        {
            _procesoService = procesoService;
        }

        [HttpGet]
        public async Task<ActionResult<ProcesoResponseDto>> GetByEstudiante()
        {
            try
            {
                var proceso = await _procesoService.GetByEstudianteIdAsync(UsuarioId);
                return Ok(new ProcesoResponseDto
                {
                    Id = proceso.Id,
                    Estado = proceso.Estado
                });
            }
            catch( KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }

        }

    }
}
