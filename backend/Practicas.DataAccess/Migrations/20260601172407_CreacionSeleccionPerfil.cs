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
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SeleccionesPerfil_Estudiantes_EstudianteId",
                        column: x => x.EstudianteId,
                        principalTable: "Estudiantes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SeleccionesPerfil");
        }
    }
}
