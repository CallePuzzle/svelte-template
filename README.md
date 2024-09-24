# Esqueleto de una aplicación con Svelte 5

Este repositorio es una plantilla para generar aplicaciones con Svelte Kit usando Svelte 5.

Incluye:

- El [conector](https://kit.svelte.dev/docs/adapter-cloudflare-workers) de Cloudflare Workers para desplegar la aplicación.
- [daisyUI](https://daisyui.com) como librería de componentes para Tailwind CSS.
- [prisma](https://www.prisma.io) como ORM para la base de datos usando [D1 Database](https://developers.cloudflare.com/d1) de Cloudflare

## D1 Database

```bash
npx prisma migrate diff \                                                                                                                                mar 24 sep 11:54:46 2024
    --from-empty \
    --to-schema-datamodel ./prisma/schema.prisma \
    --script \
    --output migrations/0001_initial.sql
npx wrangler d1 migrations apply svelte-test --local
npx prisma generate
```
