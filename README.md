# Prueba Técnica Frontend: Gestión de Tipos y Propiedades

> [!NOTE]
> Actualizacion 19 de marzo 01:58 am Solucionado Bugs.Despligue exitoso con Estilos incluidos.

## Objetivo

Desarrollar una interfaz frontend para gestionar tipos (persona, organización, evento, lugar, etc.) y propiedades (nombre, fecha de nacimiento, estado civil, dirección, color, etc.), permitiendo:

- Crear y editar tipos con un multiselect para asignar propiedades.
- Crear y editar propiedades con tipos específicos: texto, número, fecha y check.
- Utilizar Drawers para los formularios.
- Simular el backend con datos mock.

## Link del Proyecto

🔗 [Aplicación en Render](https://app-nextjs-mui.onrender.com)

## Tecnologías Utilizadas

- **Framework**: Next.js 15.2.2
- **UI**: Material UI 6.4.7
- **Estado global**: Zustand 5.0.3
- **Formularios**: React Hook Form 7.54.2, Yup 1.6.1
- **HTTP Client**: Axios 1.8.3
- **Mocking**: Axios Mock Adapter 2.1.0
- **Linting**: ESLint 9, eslint-config-next 15.2.2
- **Tipado**: TypeScript 5

## Estructura del Proyecto

```
├── app
│   ├── home
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── DialogLoader
│   ├── Drawer
│   ├── Forms
│   │   ├── FormLogin
│   │   ├── FormProperties
│   │   └── FormTypes
│   ├── HeaderTable
│   ├── Navbar
│   ├── SearchBar
│   └── Table
│       ├── CustomTableCell
│       ├── CustomTableCellActions
│       ├── CustomTableRow
│       └── index.tsx
├── interfaces
│   ├── application.interface.ts
│   ├── entity.interface.ts
│   ├── properties.interface.ts
│   └── types.interface.ts
├── mocks
│   ├── authentication.mock.ts
│   ├── mock.ts
│   ├── properties.mocks.ts
│   └── types.mock.ts
├── services
│   ├── api.ts
│   ├── authentication.service.ts
│   ├── properties.service.ts
│   └── types.service.ts
├── store
│   ├── application.store.ts
│   ├── properties.store.ts
│   └── types.store.ts
├── theme
│   └── appTheme.ts
├── utils
│   └── localStorage.util.ts
└── views
    ├── ViewConfirmationAction
    ├── ViewFormLogin
    ├── ViewFormProperties
    └── ViewFormType
```

## Instalación y Ejecución

### Requisitos Previos

- Node.js 18+
- Yarn o npm

### Pasos

1. Clonar el repositorio:
   ```sh
   git clone <repo-url>
   cd app-types-and-properties
   ```
2. Instalar dependencias:
   ```sh
   npm install  # o yarn install
   ```
3. Ejecutar el entorno de desarrollo:
   ```sh
   npm run dev  # o yarn dev
   ```
4. Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

## Autenticación Mock

Se utilizan las siguientes credenciales de prueba, ingresar cualquier contraseña en el login:

- **Admin** (`admin@fortexdesign.com`): permisos `read`, `create`, `update`, `delete`.
- **Viewer** (`viewer@fortexdesign.com`): permiso `read`.
- **Editor/Aporter** (`editorOrAporter@fortexdesign.com`): permisos `read`, `create`, `update`.

## Decisiones Técnicas y Justificación

Se decide diseñar la aplicacion segun la estructura recomendada por nextjs, de componentes fuera
del app component para separar responsabilidades, se decide utilizar una construccion modular, y reutilizable comparando los mismos valores y tratando de reutilizar, se gestiona utilizar interface para tipar las entitades, se trata de mantener el principio de unica responsabilidad, create funciones que solamente haga una sola funcion, se integra librerias para manejar las conexion (Axios), para manejar el comportamiento de un formulario (react-hook-form) y validaciones con (yup).

Se crea un store de cada entidad para manejar los comportamiento de la aplicacion y su relacion,
se trata de manejar todas las funciones de cada store desde propio hooks generados desde el store,
se platea la construccion de un login que guarde token de session, se guarda como token con una util de localStorage.

Se implementa componentes personalizados para mejora la facil de uso y de personalizacion segun las necesidades del usuario. Drawer component es usado para mostrar diferentes vistas manteniendo equida y unidad sobre la plataforma.

## Resolución de Bugs

- [ ] Search no filtra con alguna letra mayuscula, solo minuscula
- [ ] Validar Type para formularios generados por Yup conflicto con otras interfaces

## Mejoras Futuras

- Alert notificion de avance
- Unit Testing / E2E
- Personalizacion responsive
- Incluir dark-mode
- Refactorizacion de componentes
- Refactorización del estado global para mejorar la escalabilidad.

---

📌 **Este documento lo genero a las 18 de marzo a las 11:00 pm
Lamento la demora y falta de diseño.
Gracias por el feedback y las oportunidad.
Trate de sacarle el maximo provecho.**

📌 ~~En la rama dev se agregaron estilos, pero la aplicacion de despliga en prod antes de generar estilos y mejoras.~~
