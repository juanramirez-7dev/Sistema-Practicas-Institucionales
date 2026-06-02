using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practicas.API.DTOs.Documento;
using Practicas.Domain.Enums;
using Practicas.Domain.Interfaces.Services;
using System.Security.Claims;

namespace Practicas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DocumentoController : ControllerBase
    {
        private readonly IDocumentoService _documentoService;
        protected Guid EstudianteId => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);


        public DocumentoController(IDocumentoService documentoService)
        {
            _documentoService = documentoService;
        }
        
        [HttpGet("/proceso")]
        [Authorize(Roles = "Estudiante")]
        public async Task<ActionResult<IEnumerable<DocumentoResponseDto>>> GetByProceso()
        {
            try
            {
                Console.WriteLine($"Id del estudiante: {EstudianteId}");
                var documentos = await _documentoService.GetByEstudianteIdAsync(EstudianteId);
                return Ok(documentos.Select(d => new DocumentoResponseDto
                {
                    Id = d.Id,
                    Estado = d.Estado,
                    Tipo = d.Tipo,
                    Observacion = d.Observacion,
                    FechaCarga = d.FechaCarga,
                    Url = d.Url,
                    ProcesoId = d.ProcesoId
                }).ToList());

            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DocumentoResponseDto>> GetById(Guid id)
        {
            try
            {
                var documento = await _documentoService.GetByIdAsync(id);
                return Ok(new DocumentoResponseDto
                {
                    Id = documento.Id,
                    Estado = documento.Estado,
                    Tipo = documento.Tipo,
                    Observacion = documento.Observacion,
                    FechaCarga = documento.FechaCarga,
                    Url = documento.Url,
                    ProcesoId = documento.ProcesoId
                });
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<DocumentoResponseDto>> Create([FromForm] DocumentoCreateDto documentoDto)
        {
            try
            {
                Stream stream = documentoDto.File.OpenReadStream();
                string fileName = documentoDto.File.FileName;
                string extension = Path.GetExtension(documentoDto.File.FileName);

                var documento = await _documentoService.CreateAsync(EstudianteId, stream, extension, documentoDto.Tipo);
                return CreatedAtAction(nameof(GetById), new { id = documento.Id }, new DocumentoResponseDto
                {
                    Id = documento.Id,
                    Estado = documento.Estado,
                    Tipo = documento.Tipo,
                    Observacion = documento.Observacion,
                    FechaCarga = documento.FechaCarga,
                    Url = documento.Url,
                    ProcesoId = documento.ProcesoId
                });
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { Message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateByTipo(Guid id, [FromForm] DocumentoUpdateDto documentoDto)
        {
            try
            {
                Stream stream = documentoDto.File.OpenReadStream();
                string fileName = documentoDto.File.FileName;
                string extension = Path.GetExtension(documentoDto.File.FileName);

                await _documentoService.UpdateByTipoAsync(id, stream, extension);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { Message = ex.Message });
            }
        }

        [HttpPatch("{id}/estado")]
        public async Task<ActionResult> UpdateEstado(Guid id, DocumentoUpdateEstadoDto dto)
        {
            try
            {
                if (dto.Estado == EstadoDocumento.Aprobado)
                {
                    await _documentoService.AceptarAsync(id);
                }
                else if (dto.Estado == EstadoDocumento.Rechazado)
                {
                    await _documentoService.RechazarAsync(id, dto.Observacion!);
                }
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
