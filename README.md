# 🌐 TranslatePro - Proyecto Semana 04

**Bootcamp React Native** | ADSO 3171618  
**Estudiante:** Cristopher Joel León  
**Dominio asignado:** Empresa de Traducción

---

## 📱 Descripción

Aplicación con navegación Tab + Stack y **estado global Zustand**. La segunda pestaña "Guardados" muestra proyectos guardados cuyo estado viene de un store Zustand compartido con la pantalla principal. Incluye badge en el tab con conteo en tiempo real.

---

## 🏗️ Estructura del Proyecto
starter/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
├── README.md
└── src/
├── navigation/
│   ├── RootNavigator.tsx    # Tab + Stack anidado
│   └── types.ts             # RootTabParamList, HomeStackParamList
├── screens/
│   ├── HomeScreen.tsx       # Lista con botón "Guardar"
│   ├── DetailScreen.tsx     # Detalle + botón "Guardar/Quitar"
│   └── SavedScreen.tsx      # Segunda pestaña (desde store)
├── stores/
│   ├── savedStore.ts        # Store Zustand de guardados
│   └── itemsStore.ts        # Store del detalle seleccionado
├── data/
│   └── mockData.ts          # 11 proyectos de traducción
├── types/
│   └── index.ts             # Interface Project
└── theme/
└── index.ts             # COLORS, TYPOGRAPHY, SPACING, SHADOWS
plain
Copy

---

## ✅ Requisitos Cumplidos - Semana 04

| Requisito | Estado |
|-----------|--------|
| Tab Navigator con 2 pestañas | ✅ Home y Guardados |
| Stack anidado en Home | ✅ HomeList → HomeDetail |
| Store Zustand del carrito/guardados | ✅ `savedStore.ts` |
| Métodos: agregar, eliminar, limpiar | ✅ `addProject`, `removeProject`, `clearAll` |
| Badge en tab con conteo en tiempo real | ✅ `tabBarBadge` desde store |
| Botón "Guardar/Quitar" en detalle | ✅ Lee y escribe el store |
| `create<Interface>()` sin any | ✅ `create<SavedStore>()` |
| Selectores específicos | ✅ `useSavedStore((state) => state.savedProjects)` |
| Mínimo 2 acciones en store | ✅ 3 acciones (add, remove, clear) |
| TypeScript sin errores | ✅ Sin `any` |
| Dominio propio y coherente | ✅ Empresa de Traducción |

---

## 🚀 Cómo ejecutar

```bash
cd ProyectoRN
npm install
npx expo start
Presiona w para abrir en navegador web.
📋 Ramas del Proyecto
Table
Rama	Contenido
semana-01	App de Tarjetas (Semana 01)
semana-02	App de Listas con Búsqueda (Semana 02)
semana-03	App con React Navigation 7 (Semana 03)
semana-04	Estado Global con Zustand (Semana 04)