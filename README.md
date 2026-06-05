# Sistema de Prácticas Académicas

## Descripción general

Este proyecto es un sistema completo para el manejo de prácticas académicas. Incluye una API backend desarrollada en .NET 10 con autenticación JWT, acceso a base de datos SQL Server, servicios y repositorios para la lógica de negocio, y un frontend desarrollado con React, TypeScript y Vite.

### Actores principales

#### Estudiantes (sin autenticación)

* Consultar si cumplen los requisitos mínimos para iniciar el proceso de prácticas.

#### Estudiantes (autenticados)

* Consultar el estado actual de su proceso.
* Gestionar documentos pendientes.
* Actualizar su perfil profesional.
* Recibir notificaciones cuando una empresa los seleccione.

#### Empresas

* Consultar perfiles de estudiantes.
* Gestionar listas de selección de candidatos.
* Solicitar estudiantes para procesos de selección.

#### Oficina de Prácticas

* Supervisar el proceso completo de cada estudiante.
* Aprobar o rechazar documentos.
* Gestionar el avance del proceso académico.

---

## Integrantes

- Juan José Ramírez Vasquez
- Jhon Alejandro Franco Bolivar
- Keiny Liceth Murillo Mena
- Linkon Andres Palacio Inestroza


## Tecnologías utilizadas

- Backend:
  - .NET 10
  - ASP.NET Core Web API
  - Entity Framework Core
  - JWT para autenticación
  - SQL Server
  - Swagger / OpenAPI
- Frontend:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - React Router
  - React Query
  - @tabler/icons-react

## Funcionalidades implementadas

- Autenticación y autorización con JWT.
- Gestión de estudiantes.
- Gestión de empresas.
- Administración de procesos académicos.
- Manejo de perfiles profesionales.
- Subida y descarga de documentos.
- Selección de perfiles y notificaciones.
- Integración con servicios externos a través de adaptadores HTTP.
- Seed inicial de base de datos y migraciones automáticas.
- API documentada con Swagger.

## Requisitos de instalación

- .NET SDK 10
- Node.js (compatible con pnpm y Vite)
- pnpm (recomendado) o npm
- SQL Server o instancia compatible con la cadena de conexión configurada

## Pasos para ejecutar el proyecto

1. Clonar o descargar el repositorio.

2. Configurar la conexión a la base de datos en `backend/Practicas.API/appsettings.json`:

```json
"ConnectionStrings": {
  "DbConnection": "Server=localhost;Database=SistemaPracticas;Trusted_Connection=true;TrustServerCertificate=true;"
}
```

3. Abrir una terminal en la carpeta `backend/Practicas.API` y restaurar paquetes:

```bash
cd backend/Practicas.API
dotnet restore
```

4. Ejecutar la API backend:

```bash
dotnet run --launch-profile "https"
```

La API arrancará con Swagger y aplicará migraciones automáticas a la base de datos.

1. Abrir otra terminal en la carpeta `frontend` y restaurar dependencias:

```bash
cd frontend
pnpm install
```

1. Iniciar el frontend:

```bash
pnpm dev
```

7. Acceder al frontend desde el navegador en la URL que indique Vite, normalmente:

```text
http://localhost:5173
```

8. Si necesitas usar la documentación de la API, abre Swagger en:

```text
https://localhost:7200/swagger
```

## Notas

- Verifica que tu instancia de SQL Server esté disponible y que la base de datos `SistemaPracticas` pueda crearse.
- (Recomendado) Si todavía no confía en el certificado de desarrollo HTTPS de .NET, ejecute:

```bash
dotnet dev-certs https --trust
```
