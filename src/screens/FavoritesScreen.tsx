import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';

interface FavoriteProject {
  id: string;
  projectName: string;
  clientName: string;
  translatorName: string;
  status: string;
}

const favoriteProjects: FavoriteProject[] = [
  {
    id: 'f1',
    projectName: 'Manual de Usuario App Móvil',
    clientName: 'TechCorp International',
    translatorName: 'María González',
    status: 'En progreso',
  },
  {
    id: 'f2',
    projectName: 'Documentación Médica',
    clientName: 'Global Health SA',
    translatorName: 'Jean Dupont',
    status: 'Completado',
  },
  {
    id: 'f3',
    projectName: 'Contrato de Fusión Corporativa',
    clientName: 'Legal Partners LLC',
    translatorName: 'Li Wei',
    status: 'En revisión',
  },
];

export default function FavoritesScreen() {
  const renderItem = ({ item }: { item: FavoriteProject }) => (
    <View style={styles.card}>
      <Text style={styles.projectName}>{item.projectName}</Text>
      <Text style={styles.clientName}>{item.clientName}</Text>
      <View style={styles.footer}>
        <Text style={styles.translator}>👤 {item.translatorName}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⭐ Proyectos Favoritos</Text>
        <Text style={styles.headerSubtitle}>Tus proyectos más importantes</Text>
      </View>
      <FlatList
        data={favoriteProjects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.xxl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  listContent: {
    padding: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  projectName: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  clientName: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  translator: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    backgroundColor: COLORS.accent + '20',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.semibold,
  },
});