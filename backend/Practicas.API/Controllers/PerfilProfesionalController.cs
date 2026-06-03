using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practicas.API.DTOs.PerfilProfesional;
using Practicas.Domain.Entities;
using Practicas.Domain.Interfaces.Services;
using System.Security.Claims;

namespace Practicas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerfilProfesionalController : ControllerBase
    {
        private readonly IPerfilProfesionalService _perfilService;
        private readonly IEstudianteService _estudianteService;
        private readonly IDocumentoService _documentoService;

        public PerfilProfesionalController(
            IPerfilProfesionalService perfilService,
            IEstudianteService estudianteService,
            IDocumentoService documentoService)
        {
            _perfilService = perfilService;
            _estudianteService = estudianteService;
            _documentoService = documentoService;
        }

        [HttpGet]
        [Authorize(Roles = "Empresa,Oficina")]
        public async Task<ActionResult<PerfilesResponseDTO>> Buscar(
        [FromQuery] string? textoBusqueda,
        [FromQuery] string? carrera)
        {
            var estudiantes = await _estudianteService
                .BuscarPerfilesAsync(textoBusqueda, carrera);

            var response = new PerfilesResponseDTO
            {
                TotalPerfiles = estudiantes.Count(),

                Perfiles = estudiantes.Select(e =>
                    new PerfilListadoResponseDTO
                    {
                        EstudianteId = e.Id,
                        Nombre = e.Nombre,
                        Carrera = e.Carrera,
                        Habilidades = e.PerfilProfesional.Habilidades,
                        UrlFoto = e.PerfilProfesional.UrlFoto,

                        // por ahora
                        Seleccionado = false
                    })
            };

            return Ok(response);
        }


        //perfil completo de un estudiante
        [HttpGet("estudiante")]
        [Authorize(Roles = "Empresa,Oficina")]
        public async Task<ActionResult<PerfilProfesionalResponseDTO>>
            GetByEstudianteId()
        {
            try
            {
                var Id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (!Guid.TryParse(Id, out var estudianteId))
                {
                    throw new UnauthorizedAccessException($"Usuario con Id no valido");
                }
                var perfil = await _perfilService
                    .GetByEstudianteIdAsync(estudianteId);

                var hojaVida = await _documentoService.GetHojaVidaByEstudianteIdAsync(estudianteId);

                return Ok(new PerfilProfesionalResponseDTO
                {
                    Id = perfil.Id,
                    EstudianteId = perfil.EstudianteId,
                    Nombre = perfil.Estudiante.Nombre,
                    Correo = perfil.Estudiante.Correo,
                    Telefono = perfil.Estudiante.Telefono,
                    Carrera = perfil.Estudiante.Carrera,
                    Descripcion = perfil.Descripcion,
                    Habilidades = perfil.Habilidades,
                    Tecnologias = perfil.Tecnologias,
                    UrlFoto = perfil.UrlFoto,
                    UrlHojaVida = hojaVida?.Url

                });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }

        //perfil completo de un estudiante por id
        [HttpGet("estudiante/{estudianteId}")]
        public async Task<ActionResult<PerfilProfesionalResponseDTO>>
            GetByEstudianteIdForEmpresa(Guid estudianteId)
        {
            try
            {
                
                var perfil = await _perfilService
                    .GetByEstudianteIdAsync(estudianteId);

                return Ok(new PerfilProfesionalResponseDTO
                {
                    Id = perfil.Id,
                    EstudianteId = perfil.EstudianteId,
                    Nombre = perfil.Estudiante.Nombre,
                    Correo = perfil.Estudiante.Correo,
                    Telefono = perfil.Estudiante.Telefono,
                    Carrera = perfil.Estudiante.Carrera,
                    Descripcion = perfil.Descripcion,
                    Habilidades = perfil.Habilidades,
                    Tecnologias = perfil.Tecnologias,
                    UrlFoto = perfil.UrlFoto
                });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }


        //actualiza un perfil

        [HttpPut("{perfilId}")]
        [Authorize(Roles = "Estudiante")]
        public async Task<ActionResult> Update(
            Guid perfilId,
            PerfilProfesionalRequestDTO dto)
        {
            try
            {
                var perfil = new PerfilProfesional
                {
                    Id = perfilId,
                    Descripcion = dto.Descripcion,
                    Habilidades = dto.Habilidades,
                    Tecnologias = dto.Tecnologias,
                    UrlFoto = dto.UrlFoto
                };

                await _perfilService.UpdateAsync(perfil);

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
