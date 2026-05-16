import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { mockProjects } from '../data/mockData';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import type { HomeStackParamList } from '../navigation/types';
import type { RouteProp } from '@react-navigation/native';

type DetailScreenRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

export default function DetailScreen() {
  const route = useRoute<DetailScreenRouteProp>();
  const { id } = route.params;

  const project = mockProjects.find((p) => p.id === id);

  // Selectores específicos del store
  const addProject = useSavedStore((state) => state.addProject);
  const removeProject = useSavedStore((state) => state.removeProject);
  const isSaved = useSavedStore((state) => state.isSaved);

  const saved = project ? isSaved(project.id) : false;

  const toggleSave = () => {
    if (!project) return;
    if (saved) {
      removeProject(project.id);
    } else {
      addProject(project);
    }
  };

  if (!project) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Proyecto no encontrado</Text>
      </View>
    );
  }

  const getStatusColor = (status: typeof project.status) => {
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
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: project.imageUrl }} style={styles.image} />
        <Pressable
          style={[styles.saveButton, saved && styles.saveButtonActive]}
          onPress={toggleSave}
        >
          <Text style={styles.saveIcon}>{saved ? '🔖' : '🔖'}</Text>
          <Text style={[styles.saveText, saved && styles.saveTextActive]}>
            {saved ? 'Guardado' : 'Guardar'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.projectName}>{project.projectName}</Text>
        <Text style={styles.clientName}>{project.clientName}</Text>

        <Pressable
          style={[styles.actionButton, saved && styles.actionButtonActive]}
          onPress={toggleSave}
        >
          <Text style={[styles.actionButtonText, saved && styles.actionButtonTextActive]}>
            {saved ? '❌ Quitar de guardados' : '🔖 Guardar proyecto'}
          </Text>
        </Pressable>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📋 Categoría</Text>
            <Text style={styles.infoValue}>{project.category}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🌐 Idiomas</Text>
            <Text style={styles.infoValue}>
              {project.sourceLanguage} → {project.targetLanguage}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>👤 Traductor</Text>
            <Text style={styles.infoValue}>{project.translatorName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📝 Palabras</Text>
            <Text style={styles.infoValue}>
              {project.wordCount.toLocaleString()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📅 Fecha límite</Text>
            <Text style={styles.infoValue}>{project.deadline}</Text>
          </View>
        </View>

        <View style={[styles.statusContainer, { backgroundColor: getStatusColor(project.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(project.status) }]}>
            Estado: {project.status}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,  // ← Más pequeña
    resizeMode: 'cover',
  },
  saveButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButtonActive: {
    backgroundColor: COLORS.accent,
  },
  saveIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  saveText: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '600',
  },
  saveTextActive: {
    color: COLORS.white,
  },
  content: {
    padding: SPACING.md,
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
    marginBottom: SPACING.md,
  },
  actionButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  actionButtonActive: {
    backgroundColor: COLORS.danger,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.md,
    fontWeight: TYPOGRAPHY.bold,
  },
  actionButtonTextActive: {
    color: COLORS.white,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.small,
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.semibold,
  },
  statusContainer: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  statusText: {
    fontSize: TYPOGRAPHY.md,
    fontWeight: TYPOGRAPHY.bold,
  },
  errorText: {
    fontSize: TYPOGRAPHY.lg,
    color: COLORS.danger,
    textAlign: 'center',
    marginTop: SPACING.xxl,
  },
});