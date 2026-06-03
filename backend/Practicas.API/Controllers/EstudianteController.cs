using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practicas.API.DTOs;
using Practicas.Domain.Interfaces.Services;
using Practicas.Domain.Models;

namespace Practicas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudianteController : ControllerBase
    {
        private readonly IEstudianteService _estudianteService;
        public EstudianteController(IEstudianteService estudianteService)
        {
            _estudianteService = estudianteService;
        }

        [HttpGet]
        [Authorize (Roles = "Oficina")]
        public async Task<ActionResult<IEnumerable<EstudianteResponseDto>>> GetAllAsync()
        {
                var estudiantes = await _estudianteService.GetAllAsync();
                var response = estudiantes.Select(e => new EstudianteResponseDto
                {
                    Id = e.Id,
                    Carnet = e.Carnet,
                    DocumentoIdentidad = e.DocumentoIdentidad,
                    Nombre = e.Nombre,
                    Correo = e.Correo,
                    Telefono = e.Telefono,
                    Carrera = e.Carrera,
                    Facultad = e.Facultad,
                    CreditosAprobados = e.CreditosAprobados
                }).ToList();
                return Ok(response);
        }

        [HttpGet("Document/{documento}")]
        [Authorize(Roles = "Oficina")]
        public async Task<ActionResult<EstudianteResponseDto>> GetByDocumentoAsync(string documento)
        {
            try
            {
                var estudiante = await _estudianteService.GetByDocumentoAsync(documento);
                var response = new EstudianteResponseDto
                {
                    Id = estudiante.Id,
                    Carnet = estudiante.Carnet,
                    DocumentoIdentidad = estudiante.DocumentoIdentidad,
                    Nombre = estudiante.Nombre,
                    Correo = estudiante.Correo,
                    Telefono = estudiante.Telefono,
                    Carrera = estudiante.Carrera,
                    Facultad = estudiante.Facultad,
                    CreditosAprobados = estudiante.CreditosAprobados
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

        [HttpGet("{id}")]
        [Authorize(Roles = "Oficina")]
        public async Task<ActionResult<EstudianteResponseDto>> GetByIdAsync(Guid id)
        {
            try
            {
                var estudiante = await _estudianteService.GetByIdAsync(id);
                var response = new EstudianteResponseDto
                {
                    Id = estudiante.Id,
                    Carnet = estudiante.Carnet,
                    DocumentoIdentidad = estudiante.DocumentoIdentidad,
                    Nombre = estudiante.Nombre,
                    Correo = estudiante.Correo,
                    Telefono = estudiante.Telefono,
                    Carrera = estudiante.Carrera,
                    Facultad = estudiante.Facultad,
                    CreditosAprobados = estudiante.CreditosAprobados
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

        [HttpGet("Document/{documento}/ValidateCredits")]
        public async Task<ActionResult<CreditValidationResponseDTO>> ValidateCredits(string documento)
        {
            try
            {
                var approvedCredits =
                    await _estudianteService.GetApprovedCreditsAsync(documento);

                var response = new CreditValidationResponseDTO
                {
                    MeetsRequirement = approvedCredits >= 60,
                    ApprovedCredits = approvedCredits,
                    RequiredCredits = 60,
                    MissingCredits = Math.Max(0, 60 - approvedCredits)
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

        [HttpPost]
        public async Task<ActionResult<EstudianteResponseDto>> Create(string document)
        {
            try
            {
                var result = await _estudianteService.CreateAsync(document);
                var response = new EstudianteResponseDto
                {
                    Id = result.Id,
                    Carnet = result.Carnet,
                    DocumentoIdentidad = result.DocumentoIdentidad,
                    Nombre = result.Nombre,
                    Correo = result.Correo,
                    Telefono = result.Telefono,
                    Carrera = result.Carrera,
                    Facultad = result.Facultad,
                    CreditosAprobados = result.CreditosAprobados
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

        [HttpPut("Document/{documento}")]
        [Authorize(Roles = "Oficina")]
        public async Task<IActionResult> Update(string documento)
        {
            try
            {
                await _estudianteService.UpdateAsync(documento);
                return NoContent();
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
    }
}
