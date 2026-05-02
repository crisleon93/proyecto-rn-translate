import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { mockProjects } from '../data/mockData';
import ItemCard from '../components/ItemCard';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 2;
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 48) / NUM_COLUMNS; // 48 = márgenes laterales (16*2) + espacio entre columnas (16)

export default function HomeScreen() {
  const renderItem = ({ item }: { item: typeof mockProjects[0] }) => (
    <View style={styles.cardWrapper}>
      <ItemCard project={item} cardWidth={CARD_WIDTH} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌐 TranslatePro</Text>
        <Text style={styles.headerSubtitle}>Empresa de Traducción</Text>
      </View>
      <FlatList
        data={mockProjects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1a1a2e',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#a0a0a0',
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  cardWrapper: {
    margin: CARD_MARGIN,
  },
});