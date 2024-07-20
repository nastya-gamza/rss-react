import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types';

const initialState: Character[] = [];

const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    setCheckedCharacters: (state, action: PayloadAction<Character>) => {
      const { id } = action.payload;

      const existingCharacter = state.find((char) => char.id === id);

      if (existingCharacter) {
        return state.filter((char) => char.id !== id);
      } else {
        state.push(action.payload);
      }
    },
    uncheckAllCharacters: () => {
      return [];
    },
  },
});

export const { setCheckedCharacters, uncheckAllCharacters } =
  selectedCharactersSlice.actions;

export default selectedCharactersSlice.reducer;
