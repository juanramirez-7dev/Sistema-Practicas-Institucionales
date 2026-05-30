using Microsoft.EntityFrameworkCore;
using Practicas.DataAccess.Context;

var builder = WebApplication.CreateBuilder(args);

// DbContext
builder.Services.AddDbContext<PracticasDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection")));

// Authentication and Authorization

// CORS

// Services

// Repositories

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", () => Results.Redirect("/swagger"));

app.UseHttpsRedirection();

app.UseStaticFiles();

// use CORS

// use authentication

app.UseAuthorization();

app.MapControllers();

app.Run();
