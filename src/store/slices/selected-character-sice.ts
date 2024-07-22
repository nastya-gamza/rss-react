import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types';

type CharacterType = {
  character: Character;
};

const initialState: CharacterType = {
  character: {
    id: 0,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
};

const selectedCharacterSlice = createSlice({
  name: 'selectedCharacter',
  initialState,
  reducers: {
    setSelectedCharacter: (state, action: PayloadAction<Character>) => {
      state.character = action.payload;
    },
  },
});

export const { setSelectedCharacter } = selectedCharacterSlice.actions;

export default selectedCharacterSlice.reducer;
