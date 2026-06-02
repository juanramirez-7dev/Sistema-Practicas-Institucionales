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

        public PerfilProfesionalController(
            IPerfilProfesionalService perfilService,
            IEstudianteService estudianteService)
        {
            _perfilService = perfilService;
            _estudianteService = estudianteService;
        }

        [HttpGet]
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
                return NotFound(ex.Message);
            }
        }


        //actualiza un perfil

        [HttpPut("{perfilId}")]
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
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }


}
