# Prisma + Supabase Setup

Este proyecto usa **Prisma para migraciones** y **Supabase para Auth, Storage y otras funciones**.

## 🎯 Arquitectura

- **Prisma**: Migraciones de base de datos, type-safety, Prisma Studio
- **Supabase**: Autenticación, Storage, Realtime, Edge Functions

## 📦 Instalación

1. **Instalar dependencias** (ya están en package.json):
```bash
npm install
```

2. **Configurar variables de entorno**:
   - Copia `.env.example` a `.env.local`
   - Agrega tu `DATABASE_URL` de Supabase (connection string directo, no pooler)

## 🔄 Migraciones

### Crear una nueva migración:
```bash
npm run db:migrate
```

### Aplicar migraciones en producción:
```bash
npm run db:migrate:deploy
```

### Sincronizar schema sin migración (desarrollo):
```bash
npm run db:push
```

### Generar Prisma Client:
```bash
npm run db:generate
```

### Abrir Prisma Studio (GUI para ver/editar datos):
```bash
npm run db:studio
```

## 📝 Workflow Recomendado

1. **Modificar el schema** en `prisma/schema.prisma`
2. **Crear migración**: `npm run db:migrate`
3. **Revisar la migración** en `prisma/migrations/`
4. **Aplicar en Supabase**: La migración se aplica automáticamente o puedes ejecutarla manualmente

## ⚠️ Importante

- **DATABASE_URL**: Usa la conexión DIRECTA de Supabase (no el pooler) para migraciones
- **Supabase Auth**: Sigue funcionando normalmente, no se toca
- **RLS Policies**: Se mantienen en Supabase, Prisma no las afecta
- **Triggers y Functions**: Se mantienen en Supabase

## 🔗 Obtener DATABASE_URL de Supabase

1. Ve a tu proyecto en Supabase
2. Settings → Database
3. Connection string → Direct connection
4. Copia la URL y reemplaza `[YOUR-PASSWORD]` con tu contraseña de base de datos

