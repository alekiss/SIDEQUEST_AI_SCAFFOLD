import type { ImageSourcePropType } from 'react-native';
import type { MissionCategory } from '../types/Mission';

export const appImages = {
  logo: require('../../assets/images/logo.png'),
  welcomeHero: require('../../assets/images/welcome-hero.png'),
  empty: require('../../assets/images/empty-page.png'),
  loading: require('../../assets/images/loading.png'),
  error: require('../../assets/images/erro.png'),
  avatar: require('../../assets/images/avatar.png'),
};

export const categoryImages: Record<MissionCategory, ImageSourcePropType> = {
  Exploração: require('../../assets/images/exploracao.png'),
  Criatividade: require('../../assets/images/criatividade.png'),
  Social: require('../../assets/images/social.png'),
  'Desafio pessoal': require('../../assets/images/desafio-pessoal.png'),
};

export type Rank = {
  name: string;
  minLevel: number;
  image: ImageSourcePropType;
};

export const rankImages: Rank[] = [
  {
    name: 'Novato',
    minLevel: 1,
    image: require('../../assets/images/novato.png'),
  },
  {
    name: 'Explorador',
    minLevel: 5,
    image: require('../../assets/images/explorador.png'),
  },
  {
    name: 'Aventureiro',
    minLevel: 10,
    image: require('../../assets/images/aventureiro.png'),
  },
  {
    name: 'Lendário',
    minLevel: 20,
    image: require('../../assets/images/lendario.png'),
  },
];