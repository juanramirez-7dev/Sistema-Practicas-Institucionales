using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Practicas.API.DTOs.Empresa;
using Practicas.Domain.Entities;
using Practicas.Domain.Interfaces.Services;

namespace Practicas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpresaController : ControllerBase
    {
        private readonly IEmpresaService _empresaService;

        public EmpresaController(
            IEmpresaService empresaService)
        {
            _empresaService = empresaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmpresaResponseDTO>>> GetAll()
        {
            var empresas = await _empresaService.GetAllAsync();

            return Ok(empresas.Select(e => new EmpresaResponseDTO
            {
                Id = e.Id,
                Nit = e.Nit,
                Correo = e.Correo,
                Telefono = e.Telefono,
                Direccion = e.Direccion,
                RazonSocial = e.RazonSocial,
                Sector = e.Sector,
                SitioWeb = e.SitioWeb
            }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmpresaResponseDTO>> GetById(Guid id)
        {
            try
            {
                var empresa = await _empresaService.GetByIdAsync(id);

                return Ok(new EmpresaResponseDTO
                {
                    Id = empresa.Id,
                    Nit = empresa.Nit,
                    Correo = empresa.Correo,
                    Telefono = empresa.Telefono,
                    Direccion = empresa.Direccion,
                    RazonSocial = empresa.RazonSocial,
                    Sector = empresa.Sector,
                    SitioWeb = empresa.SitioWeb
                });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<EmpresaResponseDTO>> Create(
            EmpresaRequestDTO dto)
        {
            try
            {
                var empresa = new Empresa
                {
                    Nit = dto.Nit,
                    Correo = dto.Correo,
                    Telefono = dto.Telefono,
                    Direccion = dto.Direccion,
                    RazonSocial = dto.RazonSocial,
                    Sector = dto.Sector,
                    SitioWeb = dto.SitioWeb
                };

                var createdEmpresa = await _empresaService.CreateAsync(empresa);

                var response = new EmpresaResponseDTO
                {
                    Id = createdEmpresa.Id,
                    Nit = createdEmpresa.Nit,
                    Correo = createdEmpresa.Correo,
                    Telefono = createdEmpresa.Telefono,
                    Direccion = createdEmpresa.Direccion,
                    RazonSocial = createdEmpresa.RazonSocial,
                    Sector = createdEmpresa.Sector,
                    SitioWeb = createdEmpresa.SitioWeb
                };

                return Ok(response);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(
            Guid id,
            EmpresaRequestDTO dto)
        {
            try
            {
                var empresa = new Empresa
                {
                    Id = id,
                    Nit = dto.Nit,
                    Correo = dto.Correo,
                    Telefono = dto.Telefono,
                    Direccion = dto.Direccion,
                    RazonSocial = dto.RazonSocial,
                    Sector = dto.Sector,
                    SitioWeb = dto.SitioWeb
                };

                await _empresaService.UpdateAsync(empresa);

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

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                await _empresaService.DeleteAsync(id);

                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
    

