# 🌐 Human Web Design — Guía de Mantenimiento del Sitio

> Esta guía está pensada para que puedas mantener y personalizar el sitio web sin necesidad de conocimientos avanzados de programación.

---

## 📁 Estructura del Proyecto

```
human-web-design/
│
├── index.html        ← Página principal
├── servicios.html    ← Página de servicios
├── portafolio.html   ← Página de portafolio
├── styles.css        ← Todos los estilos visuales personalizados
├── script.js         ← Toda la lógica JavaScript (FAQ, formulario, filtros)
└── README.md         ← Este archivo
```

---

## ✏️ Guía de Modificación de Contenido

### 🔷 1. Cambiar el Logo / Nombre de la Agencia

El logotipo es texto estilizado. Aparece en **3 lugares** (uno por cada archivo HTML):

| Archivo           | Etiqueta a buscar                        | Qué editar             |
| ----------------- | ---------------------------------------- | ---------------------- |
| `index.html`      | `<a href="index.html" class="nav-logo">` | Texto dentro del `<a>` |
| `servicios.html`  | `<a href="index.html" class="nav-logo">` | Texto dentro del `<a>` |
| `portafolio.html` | `<a href="index.html" class="nav-logo">` | Texto dentro del `<a>` |

También aparece en el **footer** de cada página (busca `<h2>Human <span>Web</span> Design</h2>` en la sección del footer).

Si quieres reemplazar el texto por una **imagen de logo real**, cambia la etiqueta `<a class="nav-logo">` por:

```html
<a href="index.html">
  <img src="img/logo.png" alt="Human Web Design" style="height:40px" />
</a>
```

---

### 🖼️ 2. Cambiar las Imágenes del Portafolio

**Ubicación:** `portafolio.html` y `index.html`

Actualmente las tarjetas usan fondos de color como placeholder. Para reemplazarlos con imágenes reales:

1. Crea una carpeta `img/` dentro del proyecto.
2. Agrega tu imagen (ej: `proyecto1.jpg`).
3. Busca el bloque del proyecto que quieres cambiar, por ejemplo:
   ```html
   <div class="project-thumb thumb-grad-1">FitLife Gym</div>
   ```
4. Reemplázalo por:
   ```html
   <div class="project-thumb">
     <img
       src="img/fitlife-gym.jpg"
       alt="FitLife Gym"
       style="width:100%;height:100%;object-fit:cover"
     />
   </div>
   ```

**Tamaño recomendado de imágenes:** 800 × 500 px en formato `.jpg` o `.webp`.

---

### 📬 3. Cambiar Correo Electrónico y Teléfono

Busca y reemplaza en los 3 archivos HTML (sobre todo en el **footer** y la sección de **contacto** de `index.html`):

| Qué cambiar | Buscar                   | Reemplazar por |
| ----------- | ------------------------ | -------------- |
| Correo      | `hola@humanwebdesign.cl` | tu correo real |
| Teléfono    | `+56 9 XXXX XXXX`        | tu número real |

---

### 🔗 4. Cambiar los Enlace a Redes Sociales

Actualmente el footer no tiene íconos de redes sociales. Para agregarlos, localiza el bloque `.footer-brand` en cualquier footer y añade debajo del párrafo:

```html
<div style="display:flex;gap:.75rem;margin-top:1rem">
  <a
    href="https://www.instagram.com/humanwebdesign/"
    target="_blank"
    rel="noopener"
    style="color:#9CA3AF;font-size:.9rem"
    >Instagram</a
  >
  <a
    href="https://wa.me/56973410591"
    target="_blank"
    rel="noopener"
    style="color:#9CA3AF;font-size:.9rem"
    >WhatsApp</a
  >
</div>
```

Repite esto en los 3 archivos HTML.

---

### ❓ 5. Editar las Preguntas Frecuentes (FAQ)

**Archivo:** `index.html`  
**Sección:** busca el comentario `<!-- FAQ -->` o la clase `faq-list`.

Cada pregunta sigue esta estructura:

```html
<div class="faq-item">
  <div class="faq-question">
    <span>¿AQUÍ VA LA PREGUNTA?</span>
    <div class="faq-icon">+</div>
  </div>
  <div class="faq-answer">
    <p>Aquí va la respuesta completa a la pregunta.</p>
  </div>
</div>
```

- Para **editar**: cambia el texto dentro de `<span>` (pregunta) y `<p>` (respuesta).
- Para **agregar**: copia todo el bloque `<div class="faq-item">…</div>` y pégalo antes del cierre de `<div class="faq-list">`.
- Para **eliminar**: borra el bloque `<div class="faq-item">…</div>` completo.

---

### 🏆 6. Editar los Textos de Relleno (Lorem ipsum / placeholders)

Busca en los archivos HTML los siguientes textos y reemplázalos:

| Archivo           | Texto a cambiar                         | Dónde buscarlo           |
| ----------------- | --------------------------------------- | ------------------------ |
| `index.html`      | Nombre, descripción y cargo del CEO     | Clase `ceo-body`         |
| `index.html`      | Estadísticas del hero (50, 100%, 2026)  | Clase `hero-stats`       |
| `index.html`      | Descripción de proyectos del portafolio | Clase `project-info > p` |
| `portafolio.html` | Nombres y descripciones de proyectos    | Clase `project-info`     |
| `servicios.html`  | Características de cada servicio        | Clase `service-features` |

---

### 🎨 7. Cambiar los Colores de la Marca

**Archivo:** `styles.css` — al inicio del archivo encontrarás:

```css
:root {
  --magenta: #e6007e; /* Color principal */
  --cyan: #00aeea; /* Color secundario */
  --yellow: #ffd100; /* Color de acento */
  --dark: #111827; /* Texto oscuro */
  --gray: #6b7280; /* Texto secundario */
  --white: #fdfdfd; /* Fondo base */
}
```

Cambia los valores hexadecimales para modificar la paleta completa del sitio.

---

## 🗄️ Configuración de Supabase (Base de Datos del Formulario)

### ¿Qué es Supabase?

Supabase es una plataforma de base de datos en la nube. La usamos para guardar los mensajes que lleguen desde el formulario de contacto de tu sitio.

---

### Paso 1 — Crear una cuenta y proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta gratuita.
2. Haz clic en **"New Project"**.
3. Ponle un nombre al proyecto (ej: `human-web-design`).
4. Elige una contraseña segura para la base de datos (guárdala en algún lugar seguro).
5. Selecciona la región más cercana (ej: `South America (São Paulo)`).
6. Haz clic en **"Create new project"** y espera ~2 minutos.

---

### Paso 2 — Crear la tabla `contactos`

Una vez creado el proyecto, ve al panel izquierdo → **"Table Editor"** → **"+ New table"**.

Configura la tabla con los siguientes datos:

| Campo                               | Configuración |
| ----------------------------------- | ------------- |
| **Nombre de la tabla**              | `contactos`   |
| **Enable Row Level Security (RLS)** | Actívalo ✓    |

Luego agrega las columnas con el botón **"+ Add column"**:

| Nombre de columna | Tipo (Type)   | Notas                                    |
| ----------------- | ------------- | ---------------------------------------- |
| `id`              | `int8`        | Se genera automáticamente (Primary Key)  |
| `nombre_empresa`  | `text`        | Campo requerido                          |
| `correo`          | `text`        | Campo requerido                          |
| `telefono`        | `text`        | Puede ser nulo                           |
| `tipo_proyecto`   | `text`        | Campo requerido                          |
| `mensaje`         | `text`        | Campo requerido                          |
| `fecha_envio`     | `timestamptz` | Se envía desde el script automáticamente |

Haz clic en **"Save"** para crear la tabla.

---

### Paso 3 — Configurar permisos (RLS Policy)

Para que el formulario pueda insertar datos sin que un usuario esté autenticado, debes crear una política de inserción pública:

1. En el panel izquierdo ve a **"Authentication"** → **"Policies"**.
2. Busca la tabla `contactos`.
3. Haz clic en **"+ New Policy"**.
4. Selecciona **"Create a policy from scratch"**.
5. Configura así:
   - **Policy Name:** `Allow public inserts`
   - **Allowed operation:** `INSERT`
   - **Target roles:** `anon`
   - **USING expression:** (dejar vacío)
   - **WITH CHECK expression:** `true`
6. Haz clic en **"Review"** → **"Save policy"**.

---

### Paso 4 — Obtener tus credenciales de Supabase

1. En el panel izquierdo ve a **"Settings"** (ícono de engranaje).
2. Haz clic en **"API"**.
3. Verás dos datos que necesitas:

   | Dato                | Dónde está                                        |
   | ------------------- | ------------------------------------------------- |
   | **Project URL**     | Sección "Project URL" — empieza con `https://`    |
   | **anon public key** | Sección "Project API keys" → fila `anon` `public` |

   > ⚠️ **NUNCA compartas la clave `service_role`**. Solo necesitas la clave `anon`.

---

### Paso 5 — Pegar las credenciales en `script.js`

Abre `script.js` y busca estas dos líneas al inicio del archivo:

```javascript
const SUPABASE_URL = "https://TU_URL.supabase.co";
const SUPABASE_ANON_KEY = "TU_ANON_KEY_AQUI";
```

Reemplázalas con tus datos reales. Ejemplo:

```javascript
const SUPABASE_URL = "https://abcdefghijklm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ejemplo...";
```

Guarda el archivo. ¡Listo! El formulario ya enviará datos a tu base de datos.

---

### Paso 6 — Ver los mensajes recibidos

Para revisar los mensajes del formulario:

1. Ve a [https://supabase.com](https://supabase.com) → tu proyecto.
2. Panel izquierdo → **"Table Editor"**.
3. Selecciona la tabla **`contactos`**.
4. Verás todos los registros con su fecha de envío.

También puedes exportarlos como CSV desde el botón de descarga.

---

## 🚀 Cómo Subir el Sitio a Internet (Hosting)

Para que el sitio sea accesible públicamente, recomendamos:

### Opción A — Netlify (Gratis y muy fácil)

1. Ve a [https://netlify.com](https://netlify.com) y crea una cuenta.
2. Arrastra la carpeta del proyecto completo al área de deploy.
3. Netlify te dará una URL pública inmediatamente.
4. Puedes conectar tu dominio propio desde **"Domain settings"**.

### Opción B — GitHub Pages (Gratis)

1. Sube el proyecto a un repositorio público en GitHub.
2. Ve a **Settings** → **Pages** → selecciona la rama `main`.
3. GitHub publicará el sitio automáticamente.

---

## 🆘 Problemas Frecuentes

| Problema                                               | Solución                                                                                     |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| El formulario no envía y muestra error                 | Verifica que `SUPABASE_URL` y `SUPABASE_ANON_KEY` estén correctamente pegados en `script.js` |
| El formulario envía pero no aparecen datos en Supabase | Revisa que creaste la política RLS de inserción (`Allow public inserts`)                     |
| El menú de móvil no abre                               | Verifica que `script.js` esté enlazado correctamente al final del HTML                       |
| Las fuentes no cargan                                  | Verifica que el sitio tiene conexión a internet; las fuentes se cargan desde Google Fonts    |
| Los estilos no se ven bien                             | Asegúrate de que `styles.css` esté en la misma carpeta que los archivos HTML                 |

---

## 📞 Soporte

Si tienes dudas sobre la configuración del sitio, contacta al equipo de Human Web Design:

- **Correo:** hola@humanwebdesign.cl
- **WhatsApp:** +56 9 XXXX XXXX

---

_Documentación generada para Human Web Design · 2026_
