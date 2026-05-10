import { NavigatorScreenParams } from '@react-navigation/native';

// Tipos para el Stack de Home (lista → detalle)
export type HomeStackParamList = {
  HomeList: undefined;
  HomeDetail: {
    id: string;
    projectName: string;
  };
};

// Tipos para el Tab Navigator
export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Favorites: undefined;
};