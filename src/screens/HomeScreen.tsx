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
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { mockProjects } from '../data/mockData';
import { Project } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

const getCardWidth = () => {
  const { width } = Dimensions.get('window');
  const NUM_COLUMNS = 2;
  const GAP = 16;
  const SIDE_MARGIN = 20;
  return (width - (SIDE_MARGIN * 2) - GAP) / NUM_COLUMNS;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;

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

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [cardWidth, setCardWidth] = useState(getCardWidth());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setCardWidth(getCardWidth());
    });
    return () => subscription?.remove();
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
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

  const handlePress = useCallback((project: Project) => {
    navigation.navigate('HomeDetail', {
      id: project.id,
      projectName: project.projectName,
    });
  }, [navigation]);

  const renderItem: ListRenderItem<Project> = useCallback(({ item }) => {
    const isFav = favorites.has(item.id);
    
    return (
      <Pressable
        style={[styles.cardWrapper, { width: cardWidth }]}
        onPress={() => handlePress(item)}
      >
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Pressable
              style={styles.favoriteButton}
              onPress={(e) => {
                e.stopPropagation();
                toggleFavorite(item.id);
              }}
            >
              <Text style={styles.favoriteIcon}>
                {isFav ? '❤️' : '🤍'}
              </Text>
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
      </Pressable>
    );
  }, [cardWidth, handlePress, favorites, toggleFavorite]);

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
        {favorites.size > 0 && ` • ${favorites.size} en favoritos`}
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
const SIDE_MARGIN = 20;
const GAP = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchWrapper: {
    paddingHorizontal: SIDE_MARGIN,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    fontSize: TYPOGRAPHY.lg,
    marginRight: SPACING.md,
  },
  searchInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.lg,
    color: COLORS.text,
    paddingVertical: 0,
  },
  clearButton: {
    fontSize: TYPOGRAPHY.lg,
    color: COLORS.textMuted,
    padding: SPACING.xs,
  },
  resultsText: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.textMuted,
    marginHorizontal: SIDE_MARGIN,
    marginBottom: SPACING.md,
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
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
  favoriteIcon: {
    fontSize: 18,
  },
  content: {
    padding: SPACING.md,
  },
  projectName: {
    fontSize: TYPOGRAPHY.md,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.text,
    marginBottom: 4,
    lineHeight: 22,
  },
  clientName: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  language: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.semibold,
    marginBottom: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 10,
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
    fontSize: TYPOGRAPHY.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});