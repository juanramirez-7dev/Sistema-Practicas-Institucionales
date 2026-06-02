using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.UnitOfWork
{
    public interface IUnitOfWork
    {
        Task BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
        Task<int> SaveChangesAsync();
    }
}
