# 🚀 Guía de Despliegue Permanente: WisKids.app

Este proyecto está dedicado y personalizado con el nombre **WisKids.app**. Esta guía te muestra exactamente cómo tener la aplicación disponible en internet 24/7 sin coste alguno y cómo conectarla a tu dominio **wiskids.app**.

---

## 📦 Tu Paquete Listo para Despliegue

Ya está generado el archivo empaquetado con todo el código compilado para producción, iconos PWA y Service Worker:
👉 **[wiskids-dist.zip](file:///home/antigravity/wiskids-dist.zip)**

---

## 🌟 Método Recomendado: Netlify Drop (El más rápido, 100% Gratis)

No necesitas instalar programas ni usar la terminal:

1. **Descarga y descomprime:**
   - Descarga [wiskids-dist.zip](file:///home/antigravity/wiskids-dist.zip) y descomprímelo.
   - Tendrás la carpeta llamada `dist`.
2. **Sube a Netlify:**
   - Abre en tu navegador: [app.netlify.com/drop](https://app.netlify.com/drop) (si no tienes cuenta, puedes iniciar sesión con Google o correo en 10 segundos).
   - Arrastra la carpeta `dist` al recuadro punteado.
3. **Tu web ya está viva:**
   - Netlify te asignará una URL instantánea tipo `https://algo-bonito.netlify.app`.
   - Ve a **"Site configuration" > "Change site name"** y ponle **wiskids** (para que quede como `https://wiskids.netlify.app`).

### ¿Cómo vincular tu dominio `wiskids.app`?
Si has comprado o vas a comprar el dominio `wiskids.app` (en Google Domains, Namecheap, GoDaddy, Cloudflare, etc.):
1. En Netlify, ve a **Domain management** > **Add a domain**.
2. Escribe `wiskids.app`.
3. Netlify te dará 2 registros DNS simples para poner en tu proveedor de dominio:
   - **Registro A**: apuntando a `75.2.60.5`
   - **Registro CNAME (`www`)**: apuntando a tu subdominio de Netlify.
4. En cuestión de minutos, tu hijo y tú podréis entrar directamente tecleando **`https://wiskids.app`**.

---

## ⚡ Método Alternativo: Vercel

Si prefieres usar Vercel:
1. Entra en [vercel.com](https://vercel.com).
2. Crea un nuevo proyecto e importa el código o arrastra la carpeta `dist`.
3. En la sección **Domains**, añade `wiskids.app`.
4. Vercel configurará el certificado SSL automático.

---

## 📱 Experiencia en el Dispositivo de tu Hijo

Una vez abierta la URL en su Chromebook o en el móvil:
1. **En Chrome / Chromebook:** Pulsa el icono de **"Instalar WisKids.app"** en la barra de direcciones.
2. **En iPhone (Safari):** Pulsa **Compartir > Añadir a pantalla de inicio**.
3. La aplicación se ejecutará a pantalla completa, guardará sus estrellas, medallas y la racha de días de entrenamiento.
