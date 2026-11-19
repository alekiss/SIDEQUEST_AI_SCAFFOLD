import type { Mission } from '../types/Mission';

export type MainTabParamList = {
  'Missões': undefined;
  'Meu perfil': undefined;
};

export type RootStackParamList = {
  Welcome: undefined;
  MainTabs: undefined;
  Detalhes: { mission: Mission };
};
