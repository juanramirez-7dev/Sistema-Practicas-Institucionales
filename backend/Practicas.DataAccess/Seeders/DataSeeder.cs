using Practicas.DataAccess.Context;
using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using Practicas.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.DataAccess.Seeders
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(PracticasDbContext context, IHasherService hasherService)
        {
            if (context.Usuarios.Any())
                return;

            var empresas = new List<Empresa>();

            // Empresa 1
            var empresa1 = new Empresa
            {
                Id = Guid.NewGuid(),
                Nit = "900123456-1",
                Correo = "contacto@softandina.com.co",
                Telefono = "6044441122",
                Direccion = "Cra 43A #1 Sur-188, Medellín",
                RazonSocial = "Soft Andina S.A.S.",
                Sector = "Desarrollo de Software",
                SitioWeb = "https://www.softandina.com.co"
            };

            var usuarioEmpresa1 = new Usuario
            {
                Id = Guid.NewGuid(),
                Login = empresa1.Correo,
                PasswordHash = hasherService.HashPassword(empresa1.Nit),
                Rol = RolUsuario.Empresa
            };

            empresa1.UsuarioId = usuarioEmpresa1.Id;
            empresa1.Usuario = usuarioEmpresa1;

            empresas.Add(empresa1);

            // Empresa 2
            var empresa2 = new Empresa
            {
                Id = Guid.NewGuid(),
                Nit = "901234567-8",
                Correo = "talento@innovatel.com.co",
                Telefono = "6044487654",
                Direccion = "Cl 10 #43E-135, Medellín",
                RazonSocial = "Innovatel Colombia S.A.S.",
                Sector = "Tecnología y Telecomunicaciones",
                SitioWeb = "https://www.innovatel.com.co"
            };

            var usuarioEmpresa2 = new Usuario
            {
                Id = Guid.NewGuid(),
                Login = empresa2.Correo,
                PasswordHash = hasherService.HashPassword(empresa2.Nit),
                Rol = RolUsuario.Empresa
            };

            empresa2.UsuarioId = usuarioEmpresa2.Id;
            empresa2.Usuario = usuarioEmpresa2;

            empresas.Add(empresa2);

            // Empresa 3
            var empresa3 = new Empresa
            {
                Id = Guid.NewGuid(),
                Nit = "901345678-4",
                Correo = "rrhh@datacloud.com.co",
                Telefono = "6044559988",
                Direccion = "Cra 48 #20-114, Medellín",
                RazonSocial = "Data Cloud Solutions S.A.S.",
                Sector = "Servicios TI",
                SitioWeb = "https://www.datacloud.com.co"
            };

            var usuarioEmpresa3 = new Usuario
            {
                Id = Guid.NewGuid(),
                Login = empresa3.Correo,
                PasswordHash = hasherService.HashPassword(empresa3.Nit),
                Rol = RolUsuario.Empresa
            };

            empresa3.UsuarioId = usuarioEmpresa3.Id;
            empresa3.Usuario = usuarioEmpresa3;

            empresas.Add(empresa3);

            // Empresa 4
            var empresa4 = new Empresa
            {
                Id = Guid.NewGuid(),
                Nit = "901456789-2",
                Correo = "gestion@logisticplus.com.co",
                Telefono = "6044123456",
                Direccion = "Autopista Norte Km 7, Bello",
                RazonSocial = "Logistic Plus S.A.S.",
                Sector = "Logística",
                SitioWeb = "https://www.logisticplus.com.co"
            };

            var usuarioEmpresa4 = new Usuario
            {
                Id = Guid.NewGuid(),
                Login = empresa4.Correo,
                PasswordHash = hasherService.HashPassword(empresa4.Nit),
                Rol = RolUsuario.Empresa
            };

            empresa4.UsuarioId = usuarioEmpresa4.Id;
            empresa4.Usuario = usuarioEmpresa4;

            empresas.Add(empresa4);

            // Empresa 5
            var empresa5 = new Empresa
            {
                Id = Guid.NewGuid(),
                Nit = "901567890-5",
                Correo = "seleccion@finanzasglobal.com.co",
                Telefono = "6044332211",
                Direccion = "Cra 50 #52-25, Medellín",
                RazonSocial = "Finanzas Global S.A.S.",
                Sector = "Servicios Financieros",
                SitioWeb = "https://www.finanzasglobal.com.co"
            };

            var usuarioEmpresa5 = new Usuario
            {
                Id = Guid.NewGuid(),
                Login = empresa5.Correo,
                PasswordHash = hasherService.HashPassword(empresa5.Nit),
                Rol = RolUsuario.Empresa
            };

            empresa5.UsuarioId = usuarioEmpresa5.Id;
            empresa5.Usuario = usuarioEmpresa5;

            empresas.Add(empresa5);

            // Empleado Oficina de Prácticas
            var empleadoOficina = new OficinaEmpleado
            {
                Id = Guid.NewGuid(),
                Codigo = "OP001",
                Nombre = "María Fernanda Gómez",
                Sede = "Medellín"
            };

            var usuarioOficina = new Usuario
            {
                Id = Guid.NewGuid(),
                Login = empleadoOficina.Codigo,
                PasswordHash = hasherService.HashPassword(empleadoOficina.Codigo),
                Rol = RolUsuario.Oficina
            };

            empleadoOficina.UsuarioId = usuarioOficina.Id;
            empleadoOficina.Usuario = usuarioOficina;

            context.Empresas.AddRange(empresas);
            context.OficinaEmpleados.Add(empleadoOficina);

            await context.SaveChangesAsync();
        }
    }
}
