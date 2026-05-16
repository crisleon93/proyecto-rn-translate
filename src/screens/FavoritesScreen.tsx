import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Image } from 'react-native';
import { mockProjects } from '../data/mockData';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import { Project } from '../types';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFavorites(new Set(['2', '5', '9']));
  }, []);

  const favoriteProjects = mockProjects.filter(project => favorites.has(project.id));

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const getStatusColor = (status: Project['status']) => {
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

  const renderItem = ({ item }: { item: Project }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Pressable
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Text style={styles.favoriteIcon}>❤️</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.projectName}>{item.projectName}</Text>
        <Text style={styles.clientName}>{item.clientName}</Text>
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
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>💔</Text>
      <Text style={styles.emptyTitle}>No hay favoritos</Text>
      <Text style={styles.emptySubtitle}>
        Ve a la pestaña Proyectos y toca el corazón para agregar favoritos
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⭐ Proyectos Favoritos</Text>
        <Text style={styles.headerSubtitle}>
          {favoriteProjects.length} {favoriteProjects.length === 1 ? 'proyecto' : 'proyectos'} guardados
        </Text>
      </View>
      <FlatList
        data={favoriteProjects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  listContent: {
    padding: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 8,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  content: {
    padding: SPACING.lg,
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
    marginBottom: SPACING.sm,
  },
  language: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.semibold,
    marginBottom: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.lg,
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