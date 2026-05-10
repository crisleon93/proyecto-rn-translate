import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ListRenderItem,
  Dimensions,
} from 'react-native';
import { mockProjects } from '../data/mockData';
import { Project } from '../types';
import ItemCard from '../components/ItemCard';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme';

const getCardWidth = () => {
  const { width } = Dimensions.get('window');
  const NUM_COLUMNS = 2;
  const GAP = 12;
  const SIDE_MARGIN = 24;
  return (width - (SIDE_MARGIN * 2) - GAP) / NUM_COLUMNS;
};

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cardWidth, setCardWidth] = useState(getCardWidth());

  // Escuchar cambios de tamaño de pantalla
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setCardWidth(getCardWidth());
    });
    return () => subscription?.remove();
  }, []);

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

  const renderItem: ListRenderItem<Project> = useCallback(({ item }) => (
    <View style={styles.cardWrapper}>
      <ItemCard
        project={item}
        cardWidth={cardWidth}
        onPress={(project) => {
          console.log(`Proyecto seleccionado: ${project.projectName}`);
        }}
      />
    </View>
  ), [cardWidth]);

  const ListEmptyComponent = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔍</Text>
      <Text style={styles.emptyTitle}>No se encontraron proyectos</Text>
      <Text style={styles.emptySubtitle}>
        Intenta buscar con otro término
      </Text>
    </View>
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

      <View style={styles.searchWrapper}>
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
      </View>

      <Text style={styles.resultsText}>
        {filteredProjects.length} {filteredProjects.length === 1 ? 'proyecto' : 'proyectos'} encontrados
      </Text>

      <FlatList
        data={filteredProjects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        extraData={cardWidth}
      />
    </KeyboardAvoidingView>
  );
}

const { width } = Dimensions.get('window');
const SIDE_MARGIN = 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.xxl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  searchWrapper: {
    paddingHorizontal: SIDE_MARGIN,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    fontSize: TYPOGRAPHY.md,
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
    marginHorizontal: SIDE_MARGIN,
    marginBottom: SPACING.sm,
  },
  listContent: {
    paddingHorizontal: SIDE_MARGIN,
    paddingBottom: SPACING.xxl,
  },
  cardWrapper: {
    marginRight: 12,
    marginBottom: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
    width: width - (SIDE_MARGIN * 2),
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.lg,
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