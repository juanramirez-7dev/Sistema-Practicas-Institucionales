using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Practicas.DataAccess.Context;
using Practicas.DataAccess.Repositories;
using Practicas.Domain.Interfaces.Repositories;
using Practicas.Domain.Interfaces.Services;
using Practicas.Domain.Services;
using System.Text;

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

// HttpClient

// CORS

// Services
builder.Services.AddScoped<IPerfilProfesionalService, PerfilProfesionalService>();


// Repositories
builder.Services.AddScoped<IPerfilProfesionalRepository, PerfilProfesionalRepository>();


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
