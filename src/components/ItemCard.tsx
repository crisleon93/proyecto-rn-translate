import React, { memo } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Project } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '../theme';

interface ItemCardProps {
  project: Project;
  cardWidth: number;
  onPress?: (project: Project) => void;
}

const ItemCard = ({ project, cardWidth, onPress }: ItemCardProps) => {
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
        { width: cardWidth },
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
        
        <Text style={styles.language}>
          {project.sourceLanguage} → {project.targetLanguage}
        </Text>

        <View style={styles.footer}>
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
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.small,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: 90,
    resizeMode: 'cover',
  },
  content: {
    padding: SPACING.sm,
  },
  projectName: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.text,
    marginBottom: 2,
    lineHeight: 18,
  },
  clientName: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  language: {
    fontSize: TYPOGRAPHY.xs,
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
});

export default memo(ItemCard);