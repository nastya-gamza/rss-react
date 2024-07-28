import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types';

type SelectedCharacterState = {
  character: Character | null;
};

const initialState: SelectedCharacterState = {
  character: null,
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
