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

        //news
        public DbSet<Notificacion> Notificaciones { get; set; }

        public DbSet<Empresa> Empresas { get; set; }

        public DbSet<SeleccionPerfil> SeleccionesPerfil { get; set; }

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


            modelBuilder.Entity<Empresa>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Nit)
                      .IsRequired()
                      .HasMaxLength(30);
                entity.Property(e => e.RazonSocial)
                      .IsRequired()
                      .HasMaxLength(150);
                entity.Property(e => e.Sector)
                      .IsRequired()
                      .HasMaxLength(100);
                entity.Property(e => e.Correo)
                      .IsRequired()
                      .HasMaxLength(150);
                entity.Property(e => e.Telefono)
                      .IsRequired()
                      .HasMaxLength(20);
                entity.Property(e => e.Direccion)
                      .HasMaxLength(150);
                entity.Property(e => e.SitioWeb)
                      .HasMaxLength(150);
                entity.HasIndex(e => e.Nit).IsUnique();
                entity.HasIndex(e => e.Correo).IsUnique();
                entity.Property(e => e.UsuarioId).IsRequired();
                entity.HasIndex(e => e.UsuarioId).IsUnique();
                entity.HasOne(e => e.Usuario)
                      .WithOne(u => u.Empresa)
                      .HasForeignKey<Empresa>(e => e.UsuarioId)
                      .OnDelete(DeleteBehavior.Cascade);
            });


            modelBuilder.Entity<Notificacion>(entity =>
            {
                entity.HasKey(n => n.Id);

                entity.Property(n => n.Mensaje)
                      .IsRequired()
                      .HasMaxLength(500);

                entity.Property(n => n.FechaCreacion)
                      .IsRequired();

                entity.Property(n => n.Leida)
                      .IsRequired();

                entity.HasOne(n => n.Estudiante)
                      .WithMany(e => e.Notificaciones)
                      .HasForeignKey(n => n.EstudianteId)
                      .OnDelete(DeleteBehavior.Cascade);
            });


            modelBuilder.Entity<SeleccionPerfil>(entity =>
            {
                entity.HasKey(s => s.Id);

                entity.Property(s => s.FechaSeleccion)
                      .IsRequired();

                entity.Property(s => s.Activo)
                      .IsRequired();
                entity.Property(s => s.EmpresaId).IsRequired();
                entity.Property(s => s.EstudianteId).IsRequired();

                entity.HasOne(s => s.Empresa)
                      .WithMany(e => e.Selecciones)
                      .HasForeignKey(s => s.EmpresaId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(s => s.Estudiante)
                      .WithMany(e => e.Selecciones)
                      .HasForeignKey(s => s.EstudianteId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(s => new { s.EmpresaId, s.EstudianteId })
                      .IsUnique();
            });


        }
    }
}
