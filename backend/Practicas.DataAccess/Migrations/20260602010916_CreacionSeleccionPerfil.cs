using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Practicas.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class CreacionSeleccionPerfil : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Empresas_Usuarios_UsuarioId",
                table: "Empresas");

            migrationBuilder.DropForeignKey(
                name: "FK_Estudiantes_Usuarios_UsuarioId",
                table: "Estudiantes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notificaciones_Estudiantes_EstudianteId",
                table: "Notificaciones");

            migrationBuilder.DropForeignKey(
                name: "FK_PerfilesProfesionales_Estudiantes_EstudianteId",
                table: "PerfilesProfesionales");

            migrationBuilder.DropColumn(
                name: "PromedioAcademico",
                table: "Estudiantes");

            migrationBuilder.CreateTable(
                name: "SeleccionesPerfil",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmpresaId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EstudianteId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FechaSeleccion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Activo = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeleccionesPerfil", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SeleccionesPerfil_Empresas_EmpresaId",
                        column: x => x.EmpresaId,
                        principalTable: "Empresas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SeleccionesPerfil_Estudiantes_EstudianteId",
                        column: x => x.EstudianteId,
                        principalTable: "Estudiantes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SeleccionesPerfil_EmpresaId_EstudianteId",
                table: "SeleccionesPerfil",
                columns: new[] { "EmpresaId", "EstudianteId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SeleccionesPerfil_EstudianteId",
                table: "SeleccionesPerfil",
                column: "EstudianteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Empresas_Usuarios_UsuarioId",
                table: "Empresas",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Estudiantes_Usuarios_UsuarioId",
                table: "Estudiantes",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Notificaciones_Estudiantes_EstudianteId",
                table: "Notificaciones",
                column: "EstudianteId",
                principalTable: "Estudiantes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PerfilesProfesionales_Estudiantes_EstudianteId",
                table: "PerfilesProfesionales",
                column: "EstudianteId",
                principalTable: "Estudiantes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Empresas_Usuarios_UsuarioId",
                table: "Empresas");

            migrationBuilder.DropForeignKey(
                name: "FK_Estudiantes_Usuarios_UsuarioId",
                table: "Estudiantes");

            migrationBuilder.DropForeignKey(
                name: "FK_Notificaciones_Estudiantes_EstudianteId",
                table: "Notificaciones");

            migrationBuilder.DropForeignKey(
                name: "FK_PerfilesProfesionales_Estudiantes_EstudianteId",
                table: "PerfilesProfesionales");

            migrationBuilder.DropTable(
                name: "SeleccionesPerfil");

            migrationBuilder.AddColumn<decimal>(
                name: "PromedioAcademico",
                table: "Estudiantes",
                type: "decimal(4,3)",
                precision: 4,
                scale: 3,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddForeignKey(
                name: "FK_Empresas_Usuarios_UsuarioId",
                table: "Empresas",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Estudiantes_Usuarios_UsuarioId",
                table: "Estudiantes",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notificaciones_Estudiantes_EstudianteId",
                table: "Notificaciones",
                column: "EstudianteId",
                principalTable: "Estudiantes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PerfilesProfesionales_Estudiantes_EstudianteId",
                table: "PerfilesProfesionales",
                column: "EstudianteId",
                principalTable: "Estudiantes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
