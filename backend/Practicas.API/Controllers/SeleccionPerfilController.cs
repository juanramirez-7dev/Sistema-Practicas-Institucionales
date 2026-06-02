using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practicas.API.DTOs;
using Practicas.Domain.Interfaces.Services;

namespace Practicas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeleccionPerfilController : ControllerBase
    {
        private readonly ISeleccionPerfilService _seleccionService;

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
                        Correo = s.Estudiante.Correo,
                        Telefono = s.Estudiante.Telefono,
                        Carrera = s.Estudiante.Carrera,
                        FechaSeleccion = s.FechaSeleccion
                    })
            };

            return Ok(response);
        }

        [HttpGet("estudiante/{estudianteId}")]
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

