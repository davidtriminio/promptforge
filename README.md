# PromptForge

PromptForge es una plataforma profesional para gestionar prompts de forma centralizada, organizada y reutilizable.
Está pensada para usuarios que necesitan guardar, clasificar, buscar y mantener una biblioteca privada de prompts con una experiencia moderna, clara y orientada a productividad.

## Descripción

El proyecto está construido como una aplicación full stack con frontend y backend desacoplados:

- `frontend/`: aplicación React + Vite
- `backend/`: API REST con Node.js, Express y MongoDB

PromptForge permite construir una biblioteca personal de prompts con categorías, etiquetas, favoritos y una vista de dashboard para consultar el estado general del espacio de trabajo.

## Objetivos del proyecto

- Centralizar prompts en un solo lugar
- Organizar la información por categorías y etiquetas
- Facilitar la búsqueda y reutilización
- Mejorar la productividad en flujos de trabajo con IA
- Mantener una base sólida para futuras funciones avanzadas

## Características actuales

### Autenticación y seguridad
- Registro de usuarios
- Inicio de sesión
- Protección de rutas privadas
- Autenticación con JWT
- Cookies seguras
- Protección CSRF
- Rate limiting
- Middlewares de validación y seguridad

### Gestión de prompts
- Crear prompts
- Editar prompts
- Eliminar prompts
- Marcar prompts como favoritos
- Asignar categoría
- Agregar etiquetas
- Guardar título, descripción y contenido
- Consultar prompts recientes
- Filtrar y buscar prompts

### Gestión de categorías
- Crear categorías personalizadas
- Asociar color a cada categoría
- Relacionar prompts con categorías
- Visualizar distribución por categorías en el dashboard

### Dashboard
- Total de prompts
- Total de favoritos
- Total de categorías en uso
- Lista de prompts recientes
- Desglose visual por categoría

## Tecnologías utilizadas

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- shadcn/ui
- Iconify
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- CORS
- Helmet
- Express Validator
- CSRF
- Express Rate Limit

### DevOps y despliegue
- pnpm
- Vercel
- Render

## Estructura del proyecto

```text
promptforge/
├─ backend/
│  ├─ src/
│  │  ├─ config/
│  │  ├─ controllers/
│  │  ├─ middlewares/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ utils/
│  │  └─ validators/
│  ├─ .env.example
│  ├─ package.json
│  └─ pnpm-lock.yaml
├─ frontend/
│  ├─ src/
│  │  ├─ api/
│  │  ├─ components/
│  │  ├─ config/
│  │  ├─ context/
│  │  ├─ hooks/
│  │  ├─ lib/
│  │  ├─ pages/
│  │  ├─ routes/
│  │  └─ utils/
│  ├─ .env.example
│  ├─ package.json
│  ├─ pnpm-lock.yaml
│  └─ vercel.json
└─ AGENT.md
```

## Flujo principal del usuario

1. El usuario crea una cuenta o inicia sesión
2. Accede a su espacio privado
3. Crea prompts con título, descripción y contenido
4. Organiza prompts con categorías y etiquetas
5. Marca favoritos para acceso rápido
6. Consulta métricas y actividad reciente desde el dashboard

## Variables de entorno

### Backend
Usa `backend/.env.example` como referencia.

Variables principales:

- `PORT`
- `NODE_ENV`
- `TRUST_PROXY`
- `MONGO_URI`
- `CORS_ORIGINS`
- `COOKIE_SECRET`
- `ACCESS_COOKIE_NAME`
- `REFRESH_COOKIE_NAME`
- `CSRF_COOKIE_NAME`
- `COOKIE_SECURE`
- `COOKIE_SAME_SITE`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_ACCESS_EXPIRES_IN`
- `JWT_REFRESH_EXPIRES_IN`
- `API_RATE_LIMIT_WINDOW_MS`
- `API_RATE_LIMIT_MAX`
- `AUTH_RATE_LIMIT_WINDOW_MS`
- `AUTH_RATE_LIMIT_MAX`
- `AUTH_MAX_FAILED_ATTEMPTS`
- `AUTH_LOCK_WINDOW_MINUTES`
- `JSON_LIMIT`
- `URL_ENCODED_LIMIT`
- `FRONTEND_URL`
- `BACKEND_URL`

### Frontend
Usa `frontend/.env.example` como referencia.

Variables principales:

- `VITE_API_URL`

## Instalación local

### 1. Clonar el repositorio
```bash
git clone https://github.com/davidtriminio/promptforge.git
cd promptforge
```

### 2. Instalar dependencias del frontend
```bash
cd frontend
pnpm install
```

### 3. Instalar dependencias del backend
```bash
cd ../backend
pnpm install
```

### 4. Configurar variables de entorno
- Crear `backend/.env` a partir de `backend/.env.example`
- Crear `frontend/.env` a partir de `frontend/.env.example`

### 5. Ejecutar el backend
```bash
cd backend
pnpm dev
```

### 6. Ejecutar el frontend
```bash
cd frontend
pnpm dev
```

## Scripts disponibles

### Frontend
```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

### Backend
```bash
pnpm dev
pnpm start
```

## Despliegue

### Frontend en Vercel
El frontend está preparado para desplegarse en Vercel.

Puntos importantes:
- Definir correctamente `VITE_API_URL`
- Verificar que Vercel use `pnpm`
- Confirmar que el directorio raíz del proyecto frontend sea `frontend/`

### Backend en Render
El backend está preparado para desplegarse en Render.

Puntos importantes:
- Configurar las variables de entorno del backend
- Usar `pnpm install` como comando de build
- Usar `pnpm start` como comando de inicio
- Verificar CORS y URLs de frontend/backend en producción

## Estado actual del proyecto

PromptForge ya cuenta con una base funcional y una interfaz moderna para gestión de prompts.
Actualmente el proyecto cubre autenticación, CRUD principal, organización básica y dashboard inicial.

La aplicación está pensada para seguir creciendo en capacidades de organización, calidad y productividad.

## Roadmap

### 1. Autenticación base
- Registro
- Inicio de sesión
- Protección de rutas

### 2. Estructura del backend
- Configuración inicial de Express
- Conexión a MongoDB
- Middlewares principales

### 3. Modelo de usuario
- Esquema base
- Seguridad de credenciales
- Tokens

### 4. CRUD de prompts
- Crear
- Listar
- Editar
- Eliminar

### 5. Categorías
- Crear categorías
- Asociarlas a prompts
- Mejorar la organización

### 6. Favoritos
- Marcar y desmarcar prompts
- Mejorar acceso rápido

### 7. Dashboard inicial
- Métricas básicas
- Prompts recientes
- Distribución por categorías

### 8. Búsqueda y filtros
- Filtro por categoría
- Filtro por etiqueta
- Búsqueda por texto
- Ordenamiento

### 9. Mejoras visuales
- Refinamiento del dashboard
- Mejora de tarjetas
- Estados vacíos
- Pulido del modo oscuro

### 10. Seguridad y validaciones
- Validaciones de entrada
- Protección CSRF
- Rate limiting
- Hardening del backend

### 11. Migración a pnpm
- Desarrollo local con pnpm
- Producción en Vercel
- Producción en Render

### 12. Mejoras de experiencia de usuario
- Mejoras visuales
- Mejor organización
- Correcciones de layout
- Consistencia en componentes

### 13. Historial de versiones
- Registro de versiones por prompt
- Consulta de cambios
- Recuperación de versiones previas

### 14. Variables dinámicas
- Soporte para placeholders
- Reutilización flexible de prompts
- Mejor experiencia de personalización

### 15. Puntaje de calidad del prompt
- Evaluación estructural
- Indicadores de calidad
- Recomendaciones para mejorar prompts

### 16. Mejoras finales y despliegue
- Optimización general
- Pulido final de UI/UX
- Revisión completa de producción
- Cierre de entrega y despliegue definitivo

## Buenas prácticas del proyecto

- Mantener frontend y backend desacoplados
- Usar nombres claros para componentes, rutas y controladores
- Priorizar consistencia visual en la interfaz
- Mantener los mensajes de la interfaz en español
- Usar `pnpm` como gestor de paquetes principal
- Validar correctamente datos en cliente y servidor

## Próximos pasos recomendados

- Implementar historial de versiones
- Incorporar variables dinámicas
- Diseñar un sistema de puntaje de calidad del prompt
- Completar el pulido final para producción

## Autor

Proyecto desarrollado como parte de la construcción de una plataforma profesional para gestión de prompts.

## Licencia

Pendiente de definir.
