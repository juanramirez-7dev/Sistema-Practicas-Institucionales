using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.DataAccess.Context
{
    public class PracticasDbContext: DbContext
    {

        // DbSet<T> properties for your entities go here

        public PracticasDbContext(DbContextOptions<PracticasDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Fluent API configurations go here
        }
    }
}
