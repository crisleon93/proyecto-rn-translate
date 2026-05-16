import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 2;
const GAP = 12;
const SIDE_MARGIN = 20;
const CARD_WIDTH = (width - (SIDE_MARGIN * 2) - GAP) / NUM_COLUMNS;

export default function SavedScreen() {
  const savedProjects = useSavedStore((state) => state.savedProjects);
  const removeProject = useSavedStore((state) => state.removeProject);
  const clearAll = useSavedStore((state) => state.clearAll);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado':
        return COLORS.success;
      case 'En progreso':
        return COLORS.warning;
      case 'Pendiente':
        return COLORS.danger;
      case 'En revisión':
        return COLORS.info;
      default:
        return COLORS.textMuted;
    }
  };

  const renderItem = ({ item }: { item: typeof savedProjects[0] }) => (
    <View style={[styles.cardWrapper, { width: CARD_WIDTH }]}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <Pressable
            style={styles.removeButton}
            onPress={() => removeProject(item.id)}
          >
            <Text style={styles.removeIcon}>✕</Text>
          </Pressable>
        </View>
        <View style={styles.content}>
          <Text style={styles.projectName} numberOfLines={2}>
            {item.projectName}
          </Text>
          <Text style={styles.clientName} numberOfLines={1}>
            {item.clientName}
          </Text>
          <Text style={styles.language}>
            {item.sourceLanguage} → {item.targetLanguage}
          </Text>
          <View style={styles.footer}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📭</Text>
      <Text style={styles.emptyTitle}>No hay proyectos guardados</Text>
      <Text style={styles.emptySubtitle}>
        Ve a la pestaña Proyectos y toca el botón "Guardar" para agregar
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔖 Proyectos Guardados</Text>
        <Text style={styles.headerSubtitle}>
          {savedProjects.length} {savedProjects.length === 1 ? 'proyecto' : 'proyectos'} guardados
        </Text>
      </View>

      {savedProjects.length > 0 && (
        <Pressable style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.clearButtonText}>Limpiar todo</Text>
        </Pressable>
      )}

      <FlatList
        data={savedProjects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
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
  clearButton: {
    backgroundColor: COLORS.danger,
    marginHorizontal: SIDE_MARGIN,
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  clearButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.md,
    fontWeight: TYPOGRAPHY.bold,
  },
  listContent: {
    paddingHorizontal: SIDE_MARGIN,
    paddingBottom: SPACING.xxl,
  },
  cardWrapper: {
    marginRight: GAP,
    marginBottom: GAP,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    padding: 6,
  },
  removeIcon: {
    fontSize: 14,
    color: COLORS.danger,
    fontWeight: 'bold',
  },
  content: {
    padding: SPACING.md,
    minHeight: 100,
  },
  projectName: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.text,
    marginBottom: 2,
    lineHeight: 18,
  },
  clientName: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  language: {
    fontSize: 11,
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.semibold,
    marginBottom: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    fontSize: 10,
    fontWeight: TYPOGRAPHY.semibold,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.lg,
    width: width - (SIDE_MARGIN * 2),
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});