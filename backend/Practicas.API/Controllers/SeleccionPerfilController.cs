using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practicas.API.DTOs.Empresa;
using Practicas.API.DTOs.SeleccionPerfil;
using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using Practicas.Domain.Interfaces.Services;
using System.Security.Claims;

namespace Practicas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeleccionPerfilController : ControllerBase
    {
        private readonly ISeleccionPerfilService _seleccionService;
        protected Guid UsuarioId => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        public SeleccionPerfilController(
            ISeleccionPerfilService seleccionService)
        {
            _seleccionService = seleccionService;
        }

        [HttpPost]
        [Authorize(Roles = "Empresa")]
        public async Task<ActionResult<SeleccionPerfilResponseDTO>> SeleccionarEstudiante(SeleccionPerfilRequestDTO dto)
        {
            try
            {
                var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (!Guid.TryParse(id, out var empresaId))
                {
                    throw new UnauthorizedAccessException($"Usuario con Id no valido");
                }

                var selecion = await _seleccionService.SeleccionarEstudianteAsync(empresaId, dto.EstudianteId);
                var response = new SeleccionPerfilResponseDTO
                {
                    SeleccionId = selecion.Id,
                    EstudianteId = selecion.EstudianteId,
                    Nombre = selecion.Estudiante.Nombre,
                    Carrera = selecion.Estudiante.Carrera,
                    Descripcion = selecion.Estudiante.PerfilProfesional.Descripcion,
                    Habilidades = selecion.Estudiante.PerfilProfesional.Habilidades,
                    Tecnologias = selecion.Estudiante.PerfilProfesional.Tecnologias,
                    Correo = selecion.Estudiante.Correo,
                    Telefono = selecion.Estudiante.Telefono,
                    UrlFoto = selecion.Estudiante.PerfilProfesional.UrlFoto,
                    FechaSeleccion = selecion.FechaSeleccion
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
            catch (UnauthorizedAccessException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("empresa")]
        [Authorize(Roles ="Empresa")]
        public async Task<ActionResult<MiSeleccionResponseDTO>> GetByEmpresaId(Guid empresaId)
        {
            var selecciones =await _seleccionService.GetByEmpresaIdAsync(empresaId);

            var response = new MiSeleccionResponseDTO
            {
                TotalSeleccionados = selecciones.Count(),

                Selecciones = selecciones.Select(s =>
                    new SeleccionPerfilResponseDTO
                    {
                        SeleccionId = s.Id,
                        EstudianteId = s.EstudianteId,
                        Nombre = s.Estudiante.Nombre,
                        Carrera = s.Estudiante.Carrera,
                        Descripcion = s.Estudiante.PerfilProfesional.Descripcion,
                        Habilidades = s.Estudiante.PerfilProfesional.Habilidades,
                        Tecnologias = s.Estudiante.PerfilProfesional.Tecnologias,
                        Correo = s.Estudiante.Correo,
                        Telefono = s.Estudiante.Telefono,
                        UrlFoto = s.Estudiante.PerfilProfesional.UrlFoto,
                        FechaSeleccion = s.FechaSeleccion
                    })
            };

            return Ok(response);
        }

        [HttpGet("estudiante")]
        [Authorize(Roles = "Estudiante")]
        public async Task<ActionResult<EmpresasInteresadasResponseDTO>>
            GetByEstudianteId()
        {
            try
            {
                var Id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (!Guid.TryParse(Id, out var estudianteId))
                {
                    throw new UnauthorizedAccessException($"Usuario con Id no valido");
                }
                var selecciones =
                    await _seleccionService
                        .GetByEstudianteIdAsync(estudianteId);

                var response =
                    new EmpresasInteresadasResponseDTO
                    {
                        TotalEmpresasInteresadas =
                            selecciones.Count(),

                        Empresas = selecciones.Select(s =>
                            new EmpresaInteresadaResponseDTO
                            {
                                SeleccionId = s.Id,
                                EmpresaId = s.EmpresaId,
                                RazonSocial = s.Empresa.RazonSocial,
                                Sector = s.Empresa.Sector,
                                Correo = s.Empresa.Correo,
                                Telefono = s.Empresa.Telefono,
                                FechaSeleccion = s.FechaSeleccion
                            })

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

        [HttpDelete("{seleccionId}")]
        [Authorize(Roles = "Empresa")]
        public async Task<ActionResult> DesactivarSeleccion(Guid seleccionId)
        {
            try
            {
                await _seleccionService
                    .DesactivarSeleccionAsync(seleccionId);

                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message }    );
            }
        }
    }
}

