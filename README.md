# SistemaHotelero
Sistema para el manejo operativo de un hotel (estancias reales, pagos, aseo y dashboard).

## Estructura
- backend: API Node.js + TypeScript + Express (Clean Architecture, DDD, CQRS)
- frontend: React + TypeScript
- diagrams: diagramas Mermaid listos para renderizar

## Backend
1. Copia el archivo .env.example a .env y ajusta variables.
2. Si usas Supabase, ejecuta el schema con `npm run db:setup:supabase` dentro de backend.
3. Instala dependencias y levanta el servidor.

```bash
cd backend
npm install
npm run db:setup:supabase
npm run dev
```

## Supabase (entorno real)
- El schema de inicializacion esta en `backend/supabase/schema.sql`.
- Puedes ejecutarlo de dos formas:
1. SQL Editor de Supabase (copiar/pegar).
2. Script Node del proyecto: `npm run db:setup:supabase`.
- Configura en `backend/.env`:
1. `DATABASE_URL`: connection string de Supabase (pooler recomendado).
2. `DB_SSL=true`.
3. `JWT_SECRET`: secreto fuerte para firmar tokens.

## Frontend
1. Copia el archivo .env.example a .env y ajusta la URL del API.
2. Instala dependencias y levanta la UI.

```bash
cd frontend
npm install
npm run dev
```

## Diagramas
Los diagramas estan en la carpeta diagrams en formato .mmd.
