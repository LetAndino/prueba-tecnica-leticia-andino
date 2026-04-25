# prueba-tecnica-leticia-andino
Prueba Técnica – API-ficación

---

## Ejercicio 1 – CRUD básico

API REST para gestionar tareas y subtareas con paginación, filtrado y ordenamiento.

### Requisitos previos

- Java 21
- Maven 3.8+
- MySQL 8+

### Configuración de base de datos

Crear un usuario MySQL o usar el existente. La base de datos `prueba_tecnica` se crea automáticamente al iniciar la aplicación.

Verificar las credenciales en `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/prueba_tecnica?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
```

### Instalación y ejecución

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd prueba-tecnica-leticia-andino

# Compilar
mvn clean install

# Ejecutar
mvn spring-boot:run
```

La aplicación corre en `http://localhost:8080`.

Las tablas `categories` y `tasks` se crean automáticamente via Liquibase al iniciar.

### Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/tasks` | Crear tarea |
| GET | `/tasks` | Listar tareas |
| GET | `/tasks/:id` | Obtener tarea por ID |
| PUT | `/tasks/:id` | Actualizar tarea |
| DELETE | `/tasks/:id` | Eliminar tarea |
| POST | `/tasks/:id/subtasks` | Crear subtarea |
| GET | `/tasks/:id/subtasks` | Listar subtareas |
| GET | `/tasks/:id/subtasks/:subtaskId` | Obtener subtarea por ID |
| PUT | `/tasks/:id/subtasks/:subtaskId` | Actualizar subtarea |
| DELETE | `/tasks/:id/subtasks/:subtaskId` | Eliminar subtarea |

### Query params para listados

| Param | Descripción | Default |
|-------|-------------|---------|
| `page` | Número de página | `1` |
| `limit` | Cantidad por página | `10` |
| `sortBy` | Campo a ordenar | `createdAt` |
| `order` | `asc` o `desc` | `desc` |
| `categoryId` | Filtrar por categoría | - |

### Ejemplo de request

```bash
POST /tasks
Content-Type: application/json

{
  "title": "Mi tarea",
  "description": "Descripción opcional",
  "status": "PENDING",
  "categoryId": 1
}
```

### Ejemplo de response

```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 2,
    "totalPages": 10
  }
}
```

### Códigos de estado HTTP

| Código | Descripción |
|--------|-------------|
| 201 | Recurso creado |
| 200 | OK |
| 400 | Error de validación |
| 404 | Recurso no encontrado |
