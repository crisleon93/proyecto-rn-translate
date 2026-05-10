# 🌐 TranslatePro - Proyecto Semana 02

**Bootcamp React Native** | ADSO 3171618  
**Estudiante:** Cristopher Joel León  
**Dominio asignado:** Empresa de Traducción

---

## 📱 Descripción

Aplicación de listas con búsqueda en tiempo real que muestra proyectos de traducción. Incluye theming consistente, filtrado optimizado con useMemo, y callbacks memorizados para mejor rendimiento.

---

## 🏗️ Estructura del Proyecto
starter/
├── App.tsx                  # Punto de entrada
├── app.json                 # Configuración Expo
├── package.json             # Dependencias
├── tsconfig.json            # Configuración TypeScript
├── README.md                # Este archivo
└── src/
├── types/
│   └── index.ts         # Interfaz Project
├── data/
│   └── mockData.ts      # 11 proyectos de traducción
├── components/
│   └── ItemCard.tsx     # Tarjeta reutilizable con theming
├── screens/
│   └── HomeScreen.tsx   # Pantalla con FlatList + búsqueda
└── theme/
└── index.ts         # COLORS, TYPOGRAPHY, SPACING, SHADOWS
plain
Copy

---

## ✅ Requisitos Cumplidos - Semana 02

| Requisito | Estado |
|-----------|--------|
| FlatList con mínimo 10 items | ✅ 11 proyectos de traducción |
| Búsqueda en tiempo real | ✅ TextInput con filtrado instantáneo |
| Estado vacío personalizado | ✅ Mensaje cuando no hay resultados |
| ItemCard con 3+ campos | ✅ 7 campos mostrados |
| KeyboardAvoidingView | ✅ Teclado no tapa el contenido |
| Theming con constantes | ✅ COLORS, TYPOGRAPHY, SPACING, SHADOWS |
| keyExtractor con id | ✅ Nunca usa índice del array |
| useMemo para filtrado | ✅ `filteredProjects` memorizado |
| useCallback para renderItem | ✅ `renderItem` memorizado |
| useCallback para empty state | ✅ `ListEmptyComponent` memorizado |
| ItemSeparatorComponent | ✅ Separador visual entre tarjetas |
| TypeScript estricto | ✅ Sin any |

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