using Microsoft.EntityFrameworkCore;
using Practicas.DataAccess.Context;
using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using Practicas.Domain.Interfaces.Repositories;

namespace Practicas.DataAccess.Repositories
{
    public class DocumentoRepository : IDocumentoRepository
    {
        private readonly PracticasDbContext _context;

        public DocumentoRepository(PracticasDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Documento>> GetByProcesoIdAsync(Guid procesoId)
        {
            return await _context.Documentos.Where(d => d.ProcesoId == procesoId).ToListAsync();
        }
        public async Task<Documento?> GetByIdAsync(Guid id)
        {
            return await _context.Documentos.FindAsync(id);
        }
        public async Task CreateAsync(Documento documento)
        {
            await _context.Documentos.AddAsync(documento);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(Documento documento)
        {
            _context.Documentos.Update(documento);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(Guid id)
        {
            var documento = await _context.Documentos.FindAsync(id);
            if (documento != null)
            {
                _context.Documentos.Remove(documento);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<bool> ExistByTipoInProceso(Guid procesoId, TipoDocumento tipo)
        {
            return await _context.Documentos.AnyAsync(d => d.Tipo == tipo && d.ProcesoId == procesoId);
        }

        public async Task<Documento?>
        GetHojaVidaByEstudianteIdAsync(
        Guid estudianteId)
        {
            return await _context.Documentos
                .Include(d => d.Proceso)
                .FirstOrDefaultAsync(d =>
                    d.Proceso.EstudianteId == estudianteId &&
                    d.Tipo == TipoDocumento.Hoda_De_Vida);
        }

    }
}
