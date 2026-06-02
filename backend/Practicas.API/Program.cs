using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Practicas.API.JWT;
using Practicas.DataAccess.Context;
using Practicas.DataAccess.Repositories;
using Practicas.Domain.Interfaces.Observer;
using Practicas.Domain.Interfaces.Repositories;
using Practicas.Domain.Interfaces.Services;
using Practicas.Domain.Interfaces.UnitOfWork;
using Practicas.Domain.Observer;
using Practicas.Domain.Services;
using Practicas.DataAccess.ExternalServices;
using Practicas.DataAccess.Repositories;
using Practicas.Domain.Entities;
using Practicas.Domain.Interfaces.ExternalServices;
using Practicas.Domain.Interfaces.Repositories;
using Practicas.Domain.Interfaces.Services;
using Practicas.Domain.Interfaces.UnitOfWork;
using Practicas.Domain.Services;
using System.Text;
using System.Net.Mail;

var builder = WebApplication.CreateBuilder(args);

// DbContext
builder.Services.AddDbContext<PracticasDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection")));

// Authentication and Authorization
builder.Services.AddAuthentication(
    JwtBearerDefaults.AuthenticationScheme
)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters =
        new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,

            IssuerSigningKey =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        builder.Configuration["Jwt:Key"]!
                    )
                ),

            ValidateIssuer = true,

            ValidIssuer =
                builder.Configuration["Jwt:Issuer"],

            ValidateAudience = true,

            ValidAudience =
                builder.Configuration["Jwt:Audience"],

            ValidateLifetime = true
        };
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            context.Token =
                context.Request.Cookies["access_token"];

            return Task.CompletedTask;
        }
    };
});
builder.Services.AddAuthorization();
builder.Services.AddScoped<IJwtService, JwtService>();

// HttpClient - Adapter
builder.Services.AddHttpClient<
    EstudianteApiClient>(client =>
    {
        client.BaseAddress = new Uri("https://localhost:7242/");
    });
builder.Services.AddHttpClient<HistorialAcademicoApiClient>(client =>
    {
        client.BaseAddress = new Uri("https://localhost:7242/");
    });
builder.Services.AddScoped<IEstudianteExternoService, EstudianteApiAdapter>();
builder.Services.AddScoped<IHistorialAcademicoExternoService,HistorialAcademicoApiAdapter>();

// Atomicidad - Unit of Work
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// CORS

// Services
builder.Services.AddScoped<IPerfilProfesionalService, PerfilProfesionalService>();
builder.Services.AddScoped<IEstudianteService, EstudianteService>();
builder.Services.AddScoped<IHasherService, HasherService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<INotificacionService, NotificacionService>();
builder.Services.AddScoped<ISeleccionPerfilService, SeleccionPerfilService>();
builder.Services.AddScoped<IEmpresaService, EmpresaService>();
// Repositories
builder.Services.AddScoped<IPerfilProfesionalRepository, PerfilProfesionalRepository>();
builder.Services.AddScoped<IEstudianteRepository, EstudianteRepository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<INotificacionRepository, NotificacionRepository>();
builder.Services.AddScoped<ISeleccionPerfilRepository, SeleccionPerfilRepository>();
builder.Services.AddScoped<IEmpresaRepository, EmpresaRepository>();

builder.Services.AddScoped<IHasherService, HasherService>();
builder.Services.AddScoped<IPerfilProfesionalService, PerfilProfesionalService>();
builder.Services.AddScoped<IEstudianteService, EstudianteService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();

//Observer
builder.Services.AddScoped<IObserver, NotificacionObserver>();
builder.Services.AddScoped<ISubject, EstudianteSeleccionadoSubject>();
// Repositories
builder.Services.AddScoped<IPerfilProfesionalRepository, PerfilProfesionalRepository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IEstudianteRepository, EstudianteRepository>(); ;

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

// app.UseAuthentication();
// app.UseAuthorization();

app.MapControllers();

app.Run();
