import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  HomeList: undefined;
  HomeDetail: {
    id: string;
    projectName: string;
  };
};

export type RootTabParamList = {
  Home: NavigatorScreenParams <HomeStackParamList>;
  Saved: undefined;
};