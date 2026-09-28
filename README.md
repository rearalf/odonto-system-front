# Odonto System Frontend

Sistema de gestión odontológica — React + TypeScript + Vite

## Estructura de carpetas

```
src/
├── app/                                 # Configuración global de la aplicación
│   ├── config/                          # Variables de entorno y constantes base
│   ├── providers/                       # Context Providers (QueryClient, Theme, etc.)
│   ├── router/                          # Agregador central de rutas
│   │   ├── index.tsx                    # createBrowserRouter combinando módulos
│   │   └── NotFoundPage.tsx             # Página 404
│   ├── App.tsx                          # RouterProvider + Suspense boundary
│   └── main.tsx                         # Entry point (renderiza App)
│
├── assets/                              # Fuentes, imágenes e íconos estáticos
│   └── icons/
│
├── shared/                              # Elementos transversales y utilidades base
│   ├── components/                      # UI agnóstica de negocio
│   │   ├── feedback/                    # Loader, Alert, Toast
│   │   ├── forms/                       # Input, Select, Checkbox, DatePicker
│   │   ├── layout/                      # Navbar, Sidebar, DashboardLayout
│   │   │   ├── DashboardLayout.tsx      # Layout principal (Sidebar + Navbar + Outlet)
│   │   │   ├── Sidebar.tsx              # Navegación lateral con NavLink
│   │   │   └── Navbar.tsx               # Barra superior (búsqueda, notificaciones)
│   │   └── ui/                          # Button, Modal, Table, Card, Badge
│   ├── hooks/                           # Custom hooks genéricos
│   ├── services/                        # Cliente HTTP base (Axios wrapper)
│   ├── types/                           # Tipos globales del sistema
│   └── utils/                           # Funciones de formato
│
└── modules/                             # MÓDULARES POR DOMINIO
    │
    ├── dashboard/                       # Dashboard principal
    │   ├── pages/
    │   │   └── DashboardPage.tsx        # Vista de resumen
    │   └── routes.tsx                   # Ruta: /
    │
    ├── patients/                        # Módulo Pacientes (Entrega 1)
    │   ├── pages/
    │   │   ├── PatientListPage.tsx      # Listado de pacientes
    │   │   ├── PatientCreatePage.tsx    # Formulario de alta
    │   │   ├── PatientDetailPage.tsx    # Expediente del paciente
    │   │   └── PatientEditPage.tsx      # Formulario de edición
    │   └── routes.tsx                   # Rutas: /patients/*
    │
    │   # ENTREGAS FUTURAS (estructura lista para sumar)
    ├── auth/                            # Login, registro, roles
    ├── persons/                         # Persons & PersonTypes
    ├── doctors/                         # Doctores y especialidades
    ├── appointments/                    # Citas y estados
    └── odontogram/                      # Odontograma y dientes
```

## Arquitectura

**Feature-Driven**: cada módulo en `modules/` encapsula su dominio (api, components, hooks, pages, types, routes) de forma aislada.

- **`app/`** — Orquestación global: config, providers y router central que combina las rutas de todos los módulos.
- **`shared/`** — Código reutilizable sin dependencia de negocio: UI genérica, hooks, servicios HTTP, tipos base y utilidades.
- **`modules/`** — Cada dominio de la BD es un módulo independiente.

**Regla de dependencia**: los módulos pueden importar de `shared/` y entre sí bajo demanda, pero `shared/` nunca importa de `modules/`.

## Navegación y Router

El sistema de rutas usa **React Router DOM v7** con la API moderna `createBrowserRouter` y **lazy loading** por módulo.

### Flujo de carga

```
index.html
  └─ src/app/main.tsx          ← Entry point, renderiza <App />
       └─ src/app/App.tsx      ← <Suspense> boundary + <RouterProvider>
            └─ src/app/router/index.tsx  ← createBrowserRouter combina rutas
                 └─ DashboardLayout (layout compartido)
                      ├─ /              → DashboardPage (lazy)
                      ├─ /patients      → PatientListPage (lazy)
                      ├─ /patients/new  → PatientCreatePage (lazy)
                      ├─ /patients/:id  → PatientDetailPage (lazy)
                      └─ /patients/:id/edit → PatientEditPage (lazy)
```

### Cómo funciona

1. **`src/app/router/index.tsx`** — Centraliza todas las rutas. Importa los `routes.tsx` de cada módulo y los combina en un solo array que se pasa a `createBrowserRouter`.

2. **`src/modules/*/routes.tsx`** — Cada módulo exporta sus propias rutas como `RouteObject[]`. Las páginas se importan con `React.lazy()` para code-splitting automático.

3. **`src/app/App.tsx`** — Envuelve el `<RouterProvider>` en un `<Suspense>` con un fallback de carga (spinner).

4. **`src/shared/components/layout/DashboardLayout.tsx`** — Layout compartido con `<Outlet />`. Se usa como elemento raíz de todas las rutas autenticadas.

### Rutas actuales

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | `DashboardPage` | Resumen del sistema |
| `/patients` | `PatientListPage` | Listado de pacientes |
| `/patients/new` | `PatientCreatePage` | Alta de paciente |
| `/patients/:id` | `PatientDetailPage` | Expediente del paciente |
| `/patients/:id/edit` | `PatientEditPage` | Edición de paciente |
| `*` | `NotFoundPage` | Página 404 |

### Agregar un nuevo módulo

1. Crear la carpeta del módulo en `src/modules/nombre/`
2. Crear `routes.tsx` exportando un `RouteObject[]`:

```tsx
// src/modules/doctors/routes.tsx
import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const DoctorListPage = lazy(() => import('./pages/DoctorListPage'));

export const doctorRoutes: RouteObject[] = [
  {
    path: 'doctors',
    children: [
      { index: true, element: <DoctorListPage /> },
    ],
  },
];
```

3. Importar y agregar las rutas en `src/app/router/index.tsx`:

```tsx
import { doctorRoutes } from '@/modules/doctors/routes';

const allRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      ...dashboardRoutes,
      ...patientRoutes,
      ...doctorRoutes,  // ← agregar aquí
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
```

### Autenticación (futuro)

Cuando el backend esté listo, la estructura de rutas cambiará para soportar rutas protegidas:

```
/                    → DashboardLayout (requiere auth)
  ├── /              → DashboardPage
  ├── /patients/*    → Patients CRUD
  └── ...

/login               → LoginPage (pública)
/register            → RegisterPage (pública)
```

La implementación usará un `AuthGuard` o `ProtectedRoute` como wrapper en las rutas que requieran sesión activa, redirigiendo a `/login` si no hay token. El módulo `src/modules/auth/` ya está preparado para alojar esta lógica.

### Layout

El `DashboardLayout` (`src/shared/components/layout/DashboardLayout.tsx`) compone:

- **Sidebar** — Navegación lateral con `NavLink` (resalta la ruta activa automáticamente). Incluye links a Dashboard, Pacientes, Citas, Doctores y Configuración.
- **Navbar** — Barra superior con campo de búsqueda, notificaciones y avatar del usuario.
- **Outlet** — Zona de contenido donde se renderiza la página activa.

## Tech Stack

- React 19 + TypeScript
- Vite 8 (React Compiler habilitado)
- React Router DOM v7 (`createBrowserRouter`)
- TanStack React Query v5
- Axios
- Tailwind CSS v4 + Tailwind Merge + clsx
- Lucide React (íconos)
