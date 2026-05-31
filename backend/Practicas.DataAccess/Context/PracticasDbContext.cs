using Microsoft.EntityFrameworkCore;
using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.DataAccess.Context
{
    public class PracticasDbContext: DbContext
    {

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Estudiante> Estudiantes { get; set; }
        public DbSet<PerfilProfesional> PerfilesProfesionales { get; set; }

        public PracticasDbContext(DbContextOptions<PracticasDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Login).IsRequired().HasMaxLength(100);
                entity.Property(u => u.PasswordHash).IsRequired().HasMaxLength(500);
                entity.Property(u => u.Rol).IsRequired().HasMaxLength(30);
                entity.HasIndex(u => u.Login).IsUnique();
            });

            modelBuilder.Entity<Estudiante>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Carnet).IsRequired();
                entity.Property(e => e.DocumentoIdentidad).IsRequired().HasMaxLength(30);
                entity.Property(e => e.Nombre).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Correo).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Telefono).IsRequired().HasMaxLength(15);
                entity.Property(e => e.Carrera).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Facultad).IsRequired().HasMaxLength(50);
                entity.Property(e => e.CreditosAprobados).IsRequired();
                entity.Property(e => e.PromedioAcademico).HasPrecision(4, 3).IsRequired();
                entity.Property(e => e.UsuarioId).IsRequired();
                entity.HasIndex(e => e.Correo).IsUnique();
                entity.HasIndex(e => e.Carnet).IsUnique();
                entity.HasIndex(e => e.DocumentoIdentidad).IsUnique();
                entity.HasIndex(e => e.UsuarioId).IsUnique();
                entity.HasOne(e => e.Usuario)
                      .WithOne(u => u.Estudiante)
                      .HasForeignKey<Estudiante>(e => e.UsuarioId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<PerfilProfesional>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Descripcion).IsRequired().HasMaxLength(250);
                entity.Property(u => u.Habilidades).IsRequired().HasMaxLength(200);
                entity.Property(u => u.Tecnologias).IsRequired().HasMaxLength(200);
                entity.Property(u => u.UrlFoto).HasMaxLength(500);
                entity.Property(u => u.EstudianteId).IsRequired();
                entity.HasOne(p => p.Estudiante)
                      .WithOne(e => e.PerfilProfesional)
                      .HasForeignKey<PerfilProfesional>(p => p.EstudianteId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
