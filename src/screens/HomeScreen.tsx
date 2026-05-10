import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ListRenderItem,
} from 'react-native';
import { mockProjects } from '../data/mockData';
import { Project } from '../types';
import ItemCard from '../components/ItemCard';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // useMemo para filtrar la lista
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockProjects;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return mockProjects.filter((project) =>
      project.projectName.toLowerCase().includes(query) ||
      project.clientName.toLowerCase().includes(query) ||
      project.translatorName.toLowerCase().includes(query) ||
      project.sourceLanguage.toLowerCase().includes(query) ||
      project.targetLanguage.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // useCallback para renderItem
  const renderItem: ListRenderItem<Project> = useCallback(({ item }) => (
    <ItemCard
      project={item}
      onPress={(project) => {
        console.log(`Proyecto seleccionado: ${project.projectName}`);
      }}
    />
  ), []);

  // useCallback para empty state
  const ListEmptyComponent = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔍</Text>
      <Text style={styles.emptyTitle}>No se encontraron proyectos</Text>
      <Text style={styles.emptySubtitle}>
        Intenta buscar con otro término
      </Text>
    </View>
  ), []);

  // ItemSeparatorComponent
  const ItemSeparatorComponent = useCallback(() => (
    <View style={styles.separator} />
  ), []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌐 TranslatePro</Text>
        <Text style={styles.headerSubtitle}>Empresa de Traducción</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar proyectos..."
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <Text
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            ✕
          </Text>
        )}
      </View>

      <Text style={styles.resultsText}>
        {filteredProjects.length} {filteredProjects.length === 1 ? 'proyecto' : 'proyectos'} encontrados
      </Text>

      <FlatList
        data={filteredProjects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.xxxl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    marginTop: -SPACING.md,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    fontSize: TYPOGRAPHY.lg,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.md,
    color: COLORS.text,
    paddingVertical: 0,
  },
  clearButton: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.textMuted,
    padding: SPACING.xs,
  },
  resultsText: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textMuted,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  listContent: {
    paddingBottom: SPACING.xxl,
  },
  separator: {
    height: SPACING.xs,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.lg,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});