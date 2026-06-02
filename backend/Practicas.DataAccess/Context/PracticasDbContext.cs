using Microsoft.EntityFrameworkCore;
using Practicas.Domain.Entities;

namespace Practicas.DataAccess.Context
{
    public class PracticasDbContext : DbContext
    {

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Estudiante> Estudiantes { get; set; }
        public DbSet<PerfilProfesional> PerfilesProfesionales { get; set; }
        public DbSet<OficinaEmpleado> OficinaEmpleados { get; set; }
        public DbSet<Proceso> Procesos { get; set; }
        public DbSet<Documento> Documentos { get; set; }

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
                entity.Property(e => e.UsuarioId).IsRequired();
                entity.HasIndex(e => e.Correo).IsUnique();
                entity.HasIndex(e => e.Carnet).IsUnique();
                entity.HasIndex(e => e.DocumentoIdentidad).IsUnique();
                entity.HasIndex(e => e.UsuarioId).IsUnique();
                entity.HasOne(e => e.Usuario)
                      .WithOne(u => u.Estudiante)
                      .HasForeignKey<Estudiante>(e => e.UsuarioId)
                      .OnDelete(DeleteBehavior.Restrict);
                
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
                      .OnDelete(DeleteBehavior.Restrict);
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
                      .OnDelete(DeleteBehavior.Restrict);
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
                      .OnDelete(DeleteBehavior.Restrict);
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
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(s => s.Estudiante)
                      .WithMany(e => e.Selecciones)
                      .HasForeignKey(s => s.EstudianteId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasIndex(s => new { s.EmpresaId, s.EstudianteId })
                      .IsUnique();
            });

            modelBuilder.Entity<OficinaEmpleado>(entity =>
            {
                entity.HasKey(o => o.Id);
                entity.Property(o => o.Codigo).IsRequired().HasMaxLength(30);
                entity.Property(o => o.Nombre).IsRequired().HasMaxLength(100);
                entity.Property(o => o.Sede).IsRequired().HasMaxLength(100);
                entity.Property(o => o.UsuarioId).IsRequired();
                entity.HasOne(o => o.Usuario)
                      .WithOne(u => u.OficinaEmpleado)
                      .HasForeignKey<OficinaEmpleado>(o => o.UsuarioId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Proceso>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Estado).IsRequired().HasMaxLength(100);
                entity.Property(p => p.FechaInicio).IsRequired();
                entity.Property(p => p.FechaFin);
                entity.Property(p => p.EstudianteId).IsRequired();
                entity.HasOne(p => p.Estudiante)
                      .WithOne(e => e.Proceso)
                      .HasForeignKey<Proceso>(p => p.EstudianteId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Documento>(entity =>
            {
                entity.HasKey(d => d.Id);
                entity.Property(d => d.Estado).IsRequired().HasMaxLength(100);
                entity.Property(d => d.Tipo).IsRequired().HasMaxLength(50);
                entity.Property(d => d.Observacion).HasMaxLength(250);
                entity.Property(d => d.FechaCarga).IsRequired();
                entity.Property(d => d.Url).IsRequired().HasMaxLength(500);
                entity.Property(d => d.ProcesoId).IsRequired();
                entity.HasOne(d => d.Proceso)
                      .WithMany(p => p.Documentos)
                      .HasForeignKey(d => d.ProcesoId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
