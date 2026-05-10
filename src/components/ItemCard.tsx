import React, { memo } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Project } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '../theme';

interface ItemCardProps {
  project: Project;
  onPress?: (project: Project) => void;
}

const ItemCard = ({ project, onPress }: ItemCardProps) => {
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

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress?.(project)}
    >
      <Image source={{ uri: project.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.projectName} numberOfLines={2}>
          {project.projectName}
        </Text>
        <Text style={styles.clientName} numberOfLines={1}>
          {project.clientName}
        </Text>
        
        <View style={styles.detailsRow}>
          <Text style={styles.language}>
            {project.sourceLanguage} → {project.targetLanguage}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{project.category}</Text>
          <Text style={styles.metaText}>{project.wordCount.toLocaleString()} palabras</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.translator} numberOfLines={1}>
            👤 {project.translatorName}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(project.status) }]}>
              {project.status}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: SPACING.lg,
  },
  projectName: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  clientName: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  detailsRow: {
    marginBottom: SPACING.sm,
  },
  language: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.semibold,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  metaText: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textMuted,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  translator: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.semibold,
  },
});

export default memo(ItemCard);