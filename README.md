# 🌐 TranslatePro - Proyecto Semana 03

**Bootcamp React Native** | ADSO 3171618  
**Estudiante:** Cristopher Joel León  
**Dominio asignado:** Empresa de Traducción

---

## 📱 Descripción

Aplicación móvil con navegación completa usando **React Navigation 7**. Incluye Tab Navigator con pestañas de Proyectos y Favoritos, Stack Navigator anidado para navegar de lista a detalle, tipado completo de parámetros, iconos en el Tab Bar y theming consistente.

---

## 🏗️ Estructura del Proyecto
starter/
├── App.tsx                         # Punto de entrada
├── app.json                        # Configuración Expo
├── package.json                    # Dependencias exactas
├── tsconfig.json                   # Configuración TypeScript
├── README.md                       # Este archivo
└── src/
├── navigation/
│   ├── RootNavigator.tsx       # Tab + Stack anidado
│   └── types.ts                # RootTabParamList, HomeStackParamList
├── screens/
│   ├── HomeScreen.tsx          # Lista de proyectos (FlatList + búsqueda)
│   ├── DetailScreen.tsx        # Detalle del proyecto con params
│   └── FavoritesScreen.tsx     # Pestaña de favoritos
├── data/
│   └── mockData.ts             # 11 proyectos de traducción
├── types/
│   └── index.ts                # Interface Project
└── theme/
└── index.ts                # COLORS, TYPOGRAPHY, SPACING, SHADOWS
plain
Copy

---

## ✅ Requisitos Cumplidos - Semana 03

| Requisito | Estado |
|-----------|--------|
| Tab Navigator con 2 pestañas | ✅ Home (Proyectos) y Favorites |
| Stack anidado en Home | ✅ HomeList → HomeDetail |
| Params tipados (`id`, `projectName`) | ✅ Pasados y tipados sin `any` |
| Iconos en Tab Bar (Ionicons) | ✅ `list` y `heart` con estados |
| `tabBarActiveTintColor: #61DAFB` | ✅ Exacto |
| Tipado completo | ✅ `RootTabParamList` + `HomeStackParamList` |
| HomeScreen con FlatList | ✅ 11 proyectos con búsqueda |
| DetailScreen con `useRoute` | ✅ Lee params y muestra detalle |
| FavoritesScreen con 3+ ítems | ✅ 3 proyectos favoritos estáticos |
| Títulos descriptivos en header | ✅ "Proyectos" y "Detalle del Proyecto" |
| Dominio propio y coherente | ✅ Empresa de Traducción |
| TypeScript estricto | ✅ Sin `any` |

---

## 🚀 Cómo ejecutar

```bash
cd ProyectoRN
npm install
npx expo start
Presiona w para abrir en navegador web, i para iOS o a para Android.
📋 Ramas del Proyecto
Table
Rama	Contenido
semana-01	App de Tarjetas (Semana 01)
semana-02	App de Listas con Búsqueda (Semana 02)
semana-03	App con React Navigation 7 (Semana 03)
