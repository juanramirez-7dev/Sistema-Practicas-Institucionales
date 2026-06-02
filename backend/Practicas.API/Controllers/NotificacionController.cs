using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practicas.API.DTOs;
using Practicas.API.DTOs.Notificacion;
using Practicas.Domain.Interfaces.Services;
using System.Security.Claims;

namespace Practicas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificacionController : ControllerBase
    {
        private readonly INotificacionService _notificacionService;
        private readonly IEstudianteService _estudianteService;

        protected Guid UsuarioId =>
            Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        public NotificacionController(
            INotificacionService notificacionService,
            IEstudianteService estudianteService)
        {
            _notificacionService = notificacionService;
            _estudianteService = estudianteService;
        }

        [HttpGet]
        public async Task<ActionResult<NotificacionesResponseDTO>> GetMisNotificaciones()
        {

            var notificaciones = await _notificacionService.ObtenerPorEstudianteAsync(UsuarioId);

            var lista = notificaciones
                .OrderByDescending(n => n.FechaCreacion)
                .Select(n => new NotificacionResponseDTO
                {
                    Id = n.Id,
                    Mensaje = n.Mensaje,
                    FechaCreacion = n.FechaCreacion,
                    Leida = n.Leida
                })
                .ToList();

            var response = new NotificacionesResponseDTO
            {
                TotalNotificaciones = lista.Count,
                NoLeidas = lista.Count(n => !n.Leida),
                Notificaciones = lista
            };

            return Ok(response);
        }

        [HttpPatch("{id}/leida")]
        public async Task<ActionResult> MarcarComoLeida(Guid id)
        {
            try
            {
                await _notificacionService.MarcarComoLeidaAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
    

