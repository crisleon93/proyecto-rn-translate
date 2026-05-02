import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Project } from '../types';

interface ItemCardProps {
  project: Project;
  cardWidth: number;
}

export default function ItemCard({ project, cardWidth }: ItemCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { width: cardWidth },
        pressed && styles.cardPressed,
      ]}
      onPress={() => {
        console.log(`Proyecto seleccionado: ${project.projectName}`);
      }}
    >
      <Image source={{ uri: project.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.projectName} numberOfLines={2}>{project.projectName}</Text>
        <Text style={styles.clientName} numberOfLines={1}>{project.clientName}</Text>
        <Text style={styles.language}>
          {project.sourceLanguage} → {project.targetLanguage}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.translator} numberOfLines={1}>👤 {project.translatorName}</Text>
          <View style={[
            styles.statusBadge,
            project.status === 'Completado' && styles.statusCompleted,
            project.status === 'En progreso' && styles.statusInProgress,
            project.status === 'Pendiente' && styles.statusPending,
            project.status === 'En revisión' && styles.statusReview,
          ]}>
            <Text style={styles.statusText}>{project.status}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  projectName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  clientName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  language: {
    fontSize: 11,
    color: '#4a90d9',
    fontWeight: '600',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  translator: {
    fontSize: 11,
    color: '#555',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  statusCompleted: {
    backgroundColor: '#d4edda',
  },
  statusInProgress: {
    backgroundColor: '#fff3cd',
  },
  statusPending: {
    backgroundColor: '#f8d7da',
  },
  statusReview: {
    backgroundColor: '#cce5ff',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
  },
});