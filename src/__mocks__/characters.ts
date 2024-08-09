export const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '-',
  gender: 'Male',
  origin: {
    name: 'Earth',
    url: '',
  },
  location: {
    name: 'Citadel of Ricks',
    url: '',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
  url: '',
  created: '',
};

export const mockCharacters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth',
      url: '',
    },
    location: {
      name: 'Citadel of Ricks',
      url: '',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth',
      url: '',
    },
    location: {
      name: 'Citadel of Ricks',
      url: '',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: [],
    url: '',
    created: '',
  },
];

export const mockPageData = {
  info: {
    count: 826,
    pages: 42,
    next: 'https://rickandmortyapi.com/api/character/?page=2"',
    prev: null,
  },
  results: mockCharacters,
};
