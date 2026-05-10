import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { mockProjects } from '../data/mockData';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import type { HomeStackParamList } from '../navigation/types';
import type { RouteProp } from '@react-navigation/native';

type DetailScreenRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

export default function DetailScreen() {
  const route = useRoute<DetailScreenRouteProp>();
  const { id, projectName } = route.params;

  const project = mockProjects.find((p) => p.id === id);

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
      <Image source={{ uri: project.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.projectName}>{project.projectName}</Text>
        <Text style={styles.clientName}>{project.clientName}</Text>

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
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: SPACING.lg,
  },
  projectName: {
    fontSize: TYPOGRAPHY.xxl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  clientName: {
    fontSize: TYPOGRAPHY.lg,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.small,
    marginBottom: SPACING.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.semibold,
  },
  statusContainer: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  statusText: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.bold,
  },
  errorText: {
    fontSize: TYPOGRAPHY.xl,
    color: COLORS.danger,
    textAlign: 'center',
    marginTop: SPACING.xxxl,
  },
});