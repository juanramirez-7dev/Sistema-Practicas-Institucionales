using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Practicas.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Eliminaciondeatributosdelatablaestudiante : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PromedioAcademico",
                table: "Estudiantes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "PromedioAcademico",
                table: "Estudiantes",
                type: "decimal(4,3)",
                precision: 4,
                scale: 3,
                nullable: false,
                defaultValue: 0m);
        }
    }
}
