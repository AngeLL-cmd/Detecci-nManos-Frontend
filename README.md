<div align="center">

# 🖐 SmartGesture Analytics — Frontend

**Interfaz web para detección gestual en tiempo real con Machine Learning**

[![HTML5](https://img.shields.io/badge/HTML5-Semántico-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-1.3-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/js)
[![Teachable Machine](https://img.shields.io/badge/Teachable_Machine-Image-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://teachablemachine.withgoogle.com/)

---

*Aplicación web que utiliza la cámara del dispositivo para reconocer gestos corporativos en tiempo real mediante un modelo de Machine Learning entrenado con Teachable Machine. Incluye un dashboard estadístico interactivo y un historial completo de detecciones.*

</div>

<br>

## 📑 Tabla de contenidos

- [Descripción](#-descripción)
- [Vistas de la aplicación](#-vistas-de-la-aplicación)
- [Tecnologías](#-tecnologías)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Modelo de Machine Learning](#-modelo-de-machine-learning)
- [Instalación y uso](#-instalación-y-uso)
- [Conexión con el Backend](#-conexión-con-el-backend)
- [Diseño y UX](#-diseño-y-ux)

<br>

## 📝 Descripción

El frontend de **SmartGesture Analytics** es una aplicación web estática que integra inteligencia artificial directamente en el navegador. Su propósito es detectar y clasificar gestos corporativos en reuniones o entornos empresariales, ofreciendo:

- 🎥 **Detección en tiempo real** usando la webcam del dispositivo
- 📊 **Dashboard estadístico** con gráficos interactivos (barras, pie, confianza apilada)
- 📋 **Historial de detecciones** en formato tabular con datos persistidos
- 🤖 **Inferencia local** del modelo ML (sin envío de imágenes al servidor)

<br>

## 🖥 Vistas de la aplicación

La aplicación cuenta con **tres páginas principales**, accesibles desde la barra de navegación:

### 1. 🎯 Detector (`index.html`)

Página principal con tres paneles:

| Panel | Función |
|:---|:---|
| **Guía de gestos** | Referencia visual de los 4 gestos reconocibles con iconos y descripciones |
| **Cámara en vivo** | Feed de la webcam con inferencia ML en cada frame |
| **Resultado** | Gesto detectado, porcentaje de confianza y estado del guardado |

- Al detectar un gesto con confianza **≥ 90%**, se envía automáticamente al backend
- Tiene un **cooldown de 1 segundo** entre envíos para evitar duplicados

### 2. 📊 Dashboard (`dashboard.html`)

Panel de control con métricas y visualizaciones:

| Componente | Descripción |
|:---|:---|
| **5 tarjetas KPI** | Total, Aprobación, Consulta, Atención, Desacuerdo |
| **Gráfico de barras** | Volumen de detecciones por categoría |
| **Gráfico de pie** | Distribución porcentual de cada gesto |
| **Gráfico apilado** | Calidad de detección por rangos de confianza (90-93%, 93-96%, 96-99%, 99-100%) |

- 🔄 **Auto-actualización** cada 5 segundos

### 3. 📋 Historial (`historial.html`)

Tabla de registros con todas las detecciones almacenadas:

| Columna | Detalle |
|:---|:---|
| ID | Identificador único |
| Gesto | Nombre del gesto detectado |
| Confianza | Porcentaje de precisión |
| Fecha | Marca temporal del registro |

<br>

## 🛠 Tecnologías

| Tecnología | Propósito |
|:---|:---|
| **HTML5** | Estructura semántica y accesible |
| **CSS3** | Diseño corporativo con Custom Properties |
| **JavaScript ES6+** | Lógica de la aplicación |
| **TensorFlow.js** v1.3 | Motor de inferencia ML en el navegador |
| **Teachable Machine** v0.8 | Librería de clasificación de imágenes |
| **Chart.js** | Gráficos interactivos del dashboard |
| **IBM Plex Sans** | Tipografía corporativa (Google Fonts) |

<br>

## 📂 Estructura del proyecto

```
frontend/
├── css/
│   └── style.css              # Estilos globales con design system corporativo
├── js/
│   ├── api.js                 # Cliente HTTP — comunicación con el backend
│   ├── detector.js            # Lógica de la webcam e inferencia ML
│   ├── dashboard.js           # Orquestación del dashboard y auto-refresh
│   └── charts.js              # Configuración de gráficos Chart.js
├── modelo/
│   ├── model.json             # Arquitectura del modelo TensorFlow.js
│   ├── weights.bin            # Pesos entrenados del modelo (~2.1 MB)
│   └── metadata.json          # Metadatos y etiquetas de clases
├── index.html                 # Página principal — Detector de gestos
├── dashboard.html             # Dashboard estadístico
├── historial.html             # Historial de detecciones
└── favicon.ico                # Icono del sitio
```

<br>

## 🧠 Modelo de Machine Learning

El modelo de clasificación de imágenes fue entrenado con **Google Teachable Machine** y se ejecuta **localmente en el navegador** gracias a TensorFlow.js.

### Clases reconocidas

| Gesto | Emoji | Significado corporativo |
|:---|:---:|:---|
| **Aprobación** | 👍 | Confirma una propuesta o acuerdo |
| **Consulta** | ☝️ | Solicita turno o aclaración |
| **Atención** | ✋ | Pide foco o interrupción breve |
| **Desacuerdo** | ✊ | Expresa objeción o disconformidad |

### Especificaciones

| Parámetro | Valor |
|:---|:---|
| Framework | TensorFlow.js v1.7.4 |
| Librería | @teachablemachine/image v0.8 |
| Tamaño de imagen | 224 × 224 px |
| Tamaño del modelo | ~2.1 MB (weights.bin) |
| Ejecución | En el navegador (client-side) |
| Confianza mínima | 90% para registro |

<br>

## ⚙ Instalación y uso

### Prerrequisitos

- Un navegador moderno con soporte para WebRTC (Chrome, Edge, Firefox)
- Webcam funcional
- El [backend](../backend/) corriendo localmente o desplegado

### Ejecución local

Al ser una aplicación web estática, puede servirse con cualquier servidor HTTP:

```bash
# Opción 1: Con Python
cd frontend
python -m http.server 8080

# Opción 2: Con Node.js (npx)
npx -y serve .

# Opción 3: Con la extensión Live Server de VS Code
# Click derecho en index.html → "Open with Live Server"
```

Luego abre `http://localhost:8080` en tu navegador.

### Uso

1. **Abrir** la página del Detector
2. **Hacer clic** en "Iniciar cámara" y permitir acceso a la webcam
3. **Posicionar** la mano frente a la cámara con buena iluminación
4. El sistema **detecta automáticamente** el gesto y lo registra si la confianza es ≥ 90%
5. Navegar al **Dashboard** para ver estadísticas en tiempo real
6. Consultar el **Historial** para revisar todos los registros

<br>

## 🔗 Conexión con el Backend

La API se configura automáticamente según el entorno:

```javascript
const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000/api"        // Desarrollo local
        : "https://detecciongestos-backend.onrender.com/api";  // Producción
```

| Entorno | URL del backend |
|:---|:---|
| **Local** | `http://localhost:3000/api` |
| **Producción** | `https://detecciongestos-backend.onrender.com/api` |

<br>

## 🎨 Diseño y UX

### Design System

La interfaz utiliza un sistema de diseño corporativo con:

- **Tipografía**: IBM Plex Sans (Google Fonts)
- **Paleta de colores**: Slate-based con acentos semánticos
- **Componentes**: Paneles, tarjetas KPI, tablas, botones, badges
- **Layout**: CSS Grid responsive con breakpoints en 960px y 480px

### Paleta de colores

| Token | Hex | Uso |
|:---|:---:|:---|
| `--accent` | `#1d4ed8` | Acción principal, enlaces |
| `--success` | `#047857` | Aprobación, estados positivos |
| `--info` | `#0369a1` | Consulta, información |
| `--warning` | `#b45309` | Atención, advertencias |
| `--danger` | `#b91c1c` | Desacuerdo, errores |
| `--navy` | `#0f172a` | Header, fondos oscuros |

### Responsive

| Breakpoint | Adaptación |
|:---|:---|
| `> 960px` | Layout de 3 columnas en el detector, 5 tarjetas KPI |
| `≤ 960px` | Una columna, 2 tarjetas por fila, gráficos apilados |
| `≤ 480px` | Una tarjeta por fila, paddings reducidos |

---

<div align="center">

**Desarrollado como parte de la plataforma SmartGesture Analytics** 🤝

*Detección gestual en tiempo real con Machine Learning en el navegador*

</div>
