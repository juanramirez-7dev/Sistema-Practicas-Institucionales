using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Practicas.API.JWT;
using Practicas.API.services;
using Practicas.DataAccess.Context;
using Practicas.DataAccess.ExternalServices;
using Practicas.DataAccess.Repositories;
using Practicas.Domain.Interfaces.ExternalServices;
using Practicas.Domain.Interfaces.Observer;
using Practicas.Domain.Interfaces.Repositories;
using Practicas.Domain.Interfaces.Services;
using Practicas.Domain.Interfaces.UnitOfWork;
using Practicas.Domain.Observer;
using Practicas.Domain.Services;
using System.Text;
using System.Text.Json.Serialization;

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
builder.Services.AddScoped<IHistorialAcademicoExternoService, HistorialAcademicoApiAdapter>();

// Atomicidad - Unit of Work
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Services
builder.Services.AddScoped<IPerfilProfesionalService, PerfilProfesionalService>();
builder.Services.AddScoped<IDocumentoService, DocumentoService>();
builder.Services.AddScoped<IProcesoService, ProcesoService>();
builder.Services.AddScoped<ISaveFileService, SaveFileService>();
builder.Services.AddScoped<IEstudianteService, EstudianteService>();
builder.Services.AddScoped<IHasherService, HasherService>();
builder.Services.AddScoped<IEstudianteService, EstudianteService>();
builder.Services.AddScoped<IHasherService, HasherService>();
builder.Services.AddScoped<INotificacionService, NotificacionService>();
builder.Services.AddScoped<ISeleccionPerfilService, SeleccionPerfilService>();
builder.Services.AddScoped<IEmpresaService, EmpresaService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();

// Repositories
builder.Services.AddScoped<IPerfilProfesionalRepository, PerfilProfesionalRepository>();
builder.Services.AddScoped<IDocumentoRepository, DocumentoRepository>();
builder.Services.AddScoped<IProcesoRepository, ProcesoRepository>();
builder.Services.AddScoped<IEstudianteRepository, EstudianteRepository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IEstudianteRepository, EstudianteRepository>(); ;
builder.Services.AddScoped<INotificacionRepository, NotificacionRepository>();
builder.Services.AddScoped<ISeleccionPerfilRepository, SeleccionPerfilRepository>();
builder.Services.AddScoped<IEmpresaRepository, EmpresaRepository>();

//Observer
builder.Services.AddScoped<IObserver, NotificacionObserver>();
builder.Services.AddScoped<ISubject, EstudianteSeleccionadoSubject>();

// CORS
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Front", policy =>
    {
        policy.WithOrigins(allowedOrigins!)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Controllers
builder.Services.AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.Converters
           .Add(new JsonStringEnumConverter());  // convierte enums a string en JSON
        });

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

app.UseCors("Front");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
