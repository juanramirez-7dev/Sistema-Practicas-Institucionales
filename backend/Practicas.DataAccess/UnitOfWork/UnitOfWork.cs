using Microsoft.EntityFrameworkCore.Storage;
using Practicas.DataAccess.Context;
using Practicas.Domain.Interfaces.UnitOfWork;

public class UnitOfWork : IUnitOfWork
{
    private readonly PracticasDbContext _context;
    private IDbContextTransaction? _transaction;

    public UnitOfWork(PracticasDbContext context)
    {
        _context = context;
    }

    public async Task BeginTransactionAsync()
    {
        _transaction = await _context.Database.BeginTransactionAsync();
    }

    public async Task CommitAsync()
    {
        if (_transaction is not null)
            await _transaction.CommitAsync();
    }

    public async Task RollbackAsync()
    {
        if (_transaction is not null)
            await _transaction.RollbackAsync();
    }
    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}