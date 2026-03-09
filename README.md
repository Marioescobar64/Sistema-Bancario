# Sistema Bancario

Un sistema bancario completo desarrollado con Node.js y Express.js, que permite gestionar usuarios, cuentas bancarias, tarjetas, transferencias, préstamos y movimientos sospechosos. Incluye autenticación JWT, validaciones, auditoría y subida de archivos a Cloudinary.

## Tecnologías Utilizadas

- **Backend**: Node.js con Express.js
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: JSON Web Tokens (JWT)
- **Encriptación**: bcryptjs para contraseñas
- **Subida de Archivos**: Multer con Cloudinary
- **Validación**: express-validator
- **Seguridad**: Helmet, CORS, express-rate-limit
- **Logging**: Morgan
- **Gestión de Paquetes**: pnpm

## Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- MongoDB (local o en la nube, ej. MongoDB Atlas)
- pnpm (gestor de paquetes)

### Pasos de Instalación

1. **Clona el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd Sistema-Bancario
   ```

2. **Instala las dependencias**:
   ```bash
   pnpm install
   ```

3. **Configura las variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   PORT=3001
   URL_MONGODB=mongodb://localhost:27017/sistema-bancario
   JWT_SECRET=tu-secreto-jwt-aqui
   CLOUDINARY_CLOUD_NAME=tu-cloud-name
   CLOUDINARY_API_KEY=tu-api-key
   CLOUDINARY_API_SECRET=tu-api-secret
   ```

4. **Inicia el servidor**:
   ```bash
   node index.js
   ```

   El servidor se iniciará en `http://localhost:3001/veraff/v1`

## Uso

### Health Check
- **GET** `/veraff/v1/health` - Verifica el estado del servicio

### Autenticación
Todos los endpoints requieren autenticación JWT excepto login y registro.

#### Registro
- **POST** `/veraff/v1/auth/register` - Registra un nuevo usuario

#### Login
- **POST** `/veraff/v1/auth/login` - Inicia sesión y obtiene token JWT

### Usuarios
Requiere rol ADMIN para la mayoría de operaciones.

- **POST** `/veraff/v1/users` - Crear usuario (ADMIN)
- **GET** `/veraff/v1/users` - Obtener todos los usuarios (ADMIN)
- **GET** `/veraff/v1/users/:id` - Obtener usuario por ID (ADMIN)
- **PUT** `/veraff/v1/users/:id` - Actualizar usuario (ADMIN)
- **PATCH** `/veraff/v1/users/status/:id` - Cambiar estado del usuario (ADMIN)

### Cuentas
- **POST** `/veraff/v1/accounts` - Crear cuenta (ADMIN/USER)
- **GET** `/veraff/v1/accounts` - Obtener cuentas (ADMIN/USER)
- **GET** `/veraff/v1/accounts/:id` - Obtener cuenta por ID (ADMIN/USER)
- **PUT** `/veraff/v1/accounts/:id` - Actualizar cuenta (ADMIN)
- **PATCH** `/veraff/v1/accounts/status/:id` - Cambiar estado de cuenta (ADMIN)
- **PATCH** `/veraff/v1/accounts/deposit/:id` - Depositar dinero (ADMIN/USER)
- **PATCH** `/veraff/v1/accounts/withdraw/:id` - Retirar dinero (ADMIN/USER)

### Tarjetas
- **GET** `/veraff/v1/cards` - Obtener todas las tarjetas
- **GET** `/veraff/v1/cards/:id` - Obtener tarjeta por ID
- **POST** `/veraff/v1/cards` - Crear tarjeta (con imagen)
- **PUT** `/veraff/v1/cards/:id` - Actualizar tarjeta (con imagen)
- **PUT** `/veraff/v1/cards/:id/activate` - Activar tarjeta
- **PUT** `/veraff/v1/cards/:id/deactivate` - Desactivar tarjeta

### Transferencias
- **POST** `/veraff/v1/transfers` - Crear transferencia (USER/ADMIN)
- **GET** `/veraff/v1/transfers` - Obtener historial de transferencias (USER/ADMIN)

### Préstamos
- **POST** `/veraff/v1/loans` - Crear préstamo (ADMIN)
- **GET** `/veraff/v1/loans` - Obtener préstamos (ADMIN/USER)
- **GET** `/veraff/v1/loans/:id` - Obtener préstamo por ID (ADMIN/USER)
- **PUT** `/veraff/v1/loans/:id` - Actualizar préstamo (ADMIN)
- **PATCH** `/veraff/v1/loans/status/:id` - Cambiar estado del préstamo (ADMIN)

### Movimientos Sospechosos
- **GET** `/veraff/v1/suspicious` - Obtener movimientos sospechosos
- **GET** `/veraff/v1/suspicious/:id` - Obtener movimiento sospechoso por ID
- **POST** `/veraff/v1/suspicious` - Crear movimiento sospechoso
- **PUT** `/veraff/v1/suspicious/:id` - Actualizar movimiento sospechoso
- **PUT** `/veraff/v1/suspicious/:id/review` - Revisar movimiento sospechoso
- **PUT** `/veraff/v1/suspicious/:id/unreview` - Desmarcar revisión

### Logs de Auditoría
- **GET** `/veraff/v1/auditLogs` - Obtener logs de auditoría
- **GET** `/veraff/v1/auditLogs/:id` - Obtener log de auditoría por ID

## Estructura del Proyecto

```
Sistema-Bancario/
├── config/
│   ├── app.js                 # Configuración del servidor Express
│   ├── cors-configuration.js  # Configuración de CORS
│   └── db.js                  # Conexión a MongoDB
├── middlewares/
│   ├── *-validation.js        # Validaciones para cada módulo
│   ├── auth-middleware.js     # Autenticación y autorización
│   ├── file-uploader.js       # Subida de archivos
│   └── ...
├── src/
│   ├── accounts/              # Gestión de cuentas bancarias
│   ├── auth/                  # Autenticación
│   ├── cards/                 # Gestión de tarjetas
│   ├── loans/                 # Gestión de préstamos
│   ├── suspiciousMovements/   # Movimientos sospechosos
│   ├── transfers/             # Transferencias
│   ├── users/                 # Gestión de usuarios
│   └── auditLogs/             # Logs de auditoría
├── index.js                   # Punto de entrada
├── package.json
├── pnpm-lock.yaml
└── README.md
```

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia ISC.

