using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practicas.API.DTOs.Empresa;
using Practicas.API.DTOs.SeleccionPerfil;
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
        public async Task<ActionResult> SeleccionarEstudiante(
            SeleccionPerfilRequestDTO dto)
        {
            try
            {
                await _seleccionService
                    .SeleccionarEstudianteAsync(
                        dto.EmpresaId,
                        dto.EstudianteId);

                return Ok();
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

        [HttpGet("empresa/{empresaId}")]
        [Authorize(Roles ="Empresa")]
        public async Task<ActionResult<MiSeleccionResponseDTO>>
            GetByEmpresaId(Guid empresaId)
        {
            var selecciones =
                await _seleccionService
                    .GetByEmpresaIdAsync(empresaId);

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

        [HttpGet("estudiante/{estudianteId}")]
        [Authorize(Roles = "Estudiante")]
        public async Task<ActionResult<EmpresasInteresadasResponseDTO>>
            GetByEstudianteId(Guid estudianteId)
        {
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

        [HttpDelete("{seleccionId}")]
        public async Task<ActionResult>
            DesactivarSeleccion(Guid seleccionId)
        {
            try
            {
                await _seleccionService
                    .DesactivarSeleccionAsync(seleccionId);

                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}

