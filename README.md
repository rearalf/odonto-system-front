# Odonto System Frontend

Sistema de gestión odontológica — React + TypeScript + Vite

## Estructura de carpetas

```
src/
├── app/                                 # Configuración global de la aplicación
│   ├── config/                          # Variables de entorno y constantes base
│   │   └── env.ts
│   ├── providers/                       # Context Providers (QueryClient, Theme, etc.)
│   │   └── AppProvider.tsx
│   ├── router/                          # Agregador central de rutas
│   │   ├── index.tsx                    # createBrowserRouter combinando módulos
│   │   └── AppRoutes.tsx
│   ├── App.tsx
│   └── main.tsx
│
├── assets/                              # Fuentes, imágenes e íconos estáticos
│   └── icons/
│
├── shared/                              # Elementos transversales y utilidades base
│   ├── components/                      # UI agnóstica de negocio (Botones, Modales, Inputs, Tablas)
│   │   ├── feedback/                    # Loader, Alert, Toast
│   │   ├── forms/                       # Input, Select, Checkbox, DatePicker
│   │   ├── layout/                      # Navbar, Sidebar, DashboardLayout
│   │   └── ui/                          # Button, Modal, Table, Card, Badge
│   ├── hooks/                           # Custom hooks genéricos (useDebounce, useModal)
│   ├── services/                        # Cliente HTTP base (Axios / Fetch wrapper)
│   │   └── api.client.ts
│   ├── types/                           # Tipos globales del sistema
│   │   ├── api.types.ts                 # Respuestas paginadas, errores estándar
│   │   └── common.types.ts              # Gender, Status base
│   └── utils/                           # Funciones de formato (fechas, strings)
│       └── formatters.ts
│
└── modules/                             # ENTREGAS MODULARES POR DOMINIO
    │
    │   # ==========================================
    │   # ENTREGA 1: PERSONAS, PACIENTES Y TIPOS
    │   # ==========================================
    ├── persons/                         # Módulo Persons & PersonTypes
    │   ├── api/                         # Llamadas a endpoints de /persons y /person-types
    │   │   ├── person.service.ts
    │   │   └── person-type.service.ts
    │   ├── components/                  # Formularios y listados de datos personales
    │   ├── hooks/                       # Queries / Mutations (React Query o custom hooks)
    │   ├── pages/                       # Vistas de personas (si aplican por separado)
    │   ├── types/                       # Interfaces TypeScript de Person y PersonType
    │   │   └── person.types.ts
    │   └── routes.tsx                   # Sub-rutas expuestas por este módulo
    │
    ├── patients/                        # Módulo Patients (Historia clínica, antecedentes)
    │   ├── api/                         # Llamadas a endpoints de /patients
    │   │   └── patient.service.ts
    │   ├── components/                  # Sub-componentes del expediente clínico
    │   │   ├── MedicalHistoryForm.tsx   # Alergias, tratamientos sistémicos, notas
    │   │   ├── PatientForm.tsx          # Formulario principal (compone PersonForm)
    │   │   ├── PatientTable.tsx         # Listado de pacientes
    │   │   └── SystemicIssuesCheck.tsx  # Checkboxes SNC, SVC, SE, etc.
    │   ├── hooks/
    │   │   ├── usePatient.ts
    │   │   └── usePatients.ts
    │   ├── pages/                       # Vistas completas de la Entrega 1
    │   │   ├── PatientCreatePage.tsx
    │   │   ├── PatientDetailPage.tsx    # Expediente completo del paciente
    │   │   ├── PatientEditPage.tsx
    │   │   └── PatientListPage.tsx
    │   ├── types/                       # Tipos de Patient, GenderEnum, SystemicFlags
    │   │   └── patient.types.ts
    │   └── routes.tsx                   # Rutas: /patients, /patients/new, /patients/:id
    │
    │   # ==========================================
    │   # ENTREGAS FUTURAS (Estructura lista para sumar)
    │   # ==========================================
    ├── auth/                            # Usuarios, roles, permisos y login
    ├── doctors/                         # Doctores, especialidades y disponibilidades
    ├── appointments/                    # Citas y control de estados (appointment_status)
    └── odontogram/                      # Odontograma, dientes (tooth) y superficies
```

## Arquitectura

**Feature-Driven**: cada módulo en `modules/` encapsula su dominio (api, components, hooks, pages, types, routes) de forma aislada.

- **`app/`** — Orquestación global: config, providers y router central que combina las rutas de todos los módulos.
- **`shared/`** — Código reutilizable sin dependencia de negocio: UI genérica, hooks, servicios HTTP, tipos base y utilidades.
- **`modules/`** — Cada dominio de la BD es un módulo independiente. La Entrega 1 trabaja sobre `persons/` y `patients/`. Los demás (`auth`, `doctors`, `appointments`, `odontogram`) están listos para implementar sin acoplar código.

**Regla de dependencia**: los módulos pueden importar de `shared/` y entre sí bajo demanda, pero `shared/` nunca importa de `modules/`.

## Tech Stack

- React 19 + TypeScript
- Vite 8 (React Compiler habilitado)
- React Router DOM v7
- TanStack React Query v5
- Axios
- Tailwind Merge + clsx
- Lucide React (íconos)
