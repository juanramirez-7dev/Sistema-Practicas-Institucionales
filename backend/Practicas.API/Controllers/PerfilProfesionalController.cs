using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practicas.API.DTOs;
using Practicas.Domain.Entities;
using Practicas.Domain.Interfaces.Services;

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

        [HttpGet("buscar")]
        public async Task<ActionResult<IEnumerable<PerfilProfesionalResponseDTO>>> Buscar(
            [FromQuery] string? textoBusqueda,
            [FromQuery] string? carrera)
        {
            var estudiantes = await _estudianteService
                .BuscarPerfilesAsync(textoBusqueda, carrera);

            return Ok(estudiantes.Select(e =>
                new PerfilProfesionalResponseDTO
                {
                    Id = e.PerfilProfesional.Id,
                    EstudianteId = e.Id,
                    Nombre = e.Nombre,
                    Correo = e.Correo,
                    Telefono = e.Telefono,
                    Carrera = e.Carrera,
                    Facultad = e.Facultad,
                    CreditosAprobados = e.CreditosAprobados,
                    Descripcion = e.PerfilProfesional.Descripcion,
                    Habilidades = e.PerfilProfesional.Habilidades,
                    Tecnologias = e.PerfilProfesional.Tecnologias,
                    UrlFoto = e.PerfilProfesional.UrlFoto
                }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PerfilProfesionalResponseDTO>> GetById(Guid id)
        {
            try
            {
                var perfil = await _perfilService.GetByIdAsync(id);

                return Ok(new PerfilProfesionalResponseDTO
                {
                    Id = perfil.Id,
                    EstudianteId = perfil.EstudianteId,
                    Nombre = perfil.Estudiante.Nombre,
                    Correo = perfil.Estudiante.Correo,
                    Telefono = perfil.Estudiante.Telefono,
                    Carrera = perfil.Estudiante.Carrera,
                    Facultad = perfil.Estudiante.Facultad,
                    CreditosAprobados = perfil.Estudiante.CreditosAprobados,
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

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(
            Guid id,
            PerfilProfesionalRequestDTO dto)
        {
            try
            {
                var perfil = new PerfilProfesional
                {
                    Id = id,
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
