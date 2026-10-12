# Compinche Space

App PWA local-first de microhábitos y autocuidado. La Fase 1 funciona sin cuenta: check-in, recomendación explicable, actividad, resultado guardado, diario cifrado y ajustes de privacidad.

## Desarrollo

```bash
npm install
npm run dev
```

Para verificar antes de publicar:

```bash
npm test
npm run build
```

El service worker guarda la aplicación y su contenido después de la primera carga. Prueba el modo sin conexión desde DevTools > Network > Offline; no se publica una vista local.

## Privacidad verificable

- El contenido del diario se cifra con Web Crypto AES-GCM antes de guardarse en IndexedDB (`compinche-space`, tabla `journal`). El registro contiene únicamente `ciphertext` e `iv`, no el texto legible.
- `npm test` incluye una prueba que comprueba que el texto no aparece en el cifrado. No existe código de red, analítica ni `console` para el diario: DevTools > Network no debe mostrar solicitudes al guardar una entrada.
- La exportación JSON y la eliminación total están en Perfil. La frase de acceso opcional está preparada criptográficamente (PBKDF2), pero la interfaz para activarla se deja para una iteración posterior; no se finge que esté activa.

## Límites y publicación

No es atención profesional ni servicio de emergencia. Los recursos de apoyo están en `config/support-resources.ts` y están marcados como **PENDIENTE DE VERIFICAR POR UNA PERSONA**; no publicar teléfonos hasta verificarlos.

Fase 2/3 (no implementada): cuentas/sincronización, retos, suscripción, panel editorial, notificaciones y analítica agregada. Los datos se mantienen locales en Fase 1.

Los contratos de datos para esas fases están reservados en `data/future-models.ts`; no activan cuentas, red, retos, cobros ni notificaciones.
