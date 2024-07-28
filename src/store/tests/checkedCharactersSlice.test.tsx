import checkedCharactersReducer, {
  setCheckedCharacters,
  uncheckAllCharacters,
  checkedCharactersSelector,
} from '../slices/checkedCharactersSlice.ts';
import { Character } from '../../types';
import { mockCharacter } from '../../__mocks__/characters.ts';

const initialState: Character[] = [];

describe('checkedCharacters slice', () => {
  test('should return the initial state', () => {
    const result = checkedCharactersReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  test('should handle setCheckedCharacters to add a character', () => {
    const action = { type: setCheckedCharacters.type, payload: mockCharacter };
    const result = checkedCharactersReducer(initialState, action);

    expect(result).toEqual([mockCharacter]);
  });

  test('should handle setCheckedCharacters to remove a character', () => {
    const action = {
      type: setCheckedCharacters.type,
      payload: mockCharacter,
    };
    const initialStateWithCharacter = [mockCharacter];
    const result = checkedCharactersReducer(initialStateWithCharacter, action);

    expect(result).toEqual([]);
  });

  test('should handle uncheckAllCharacters', () => {
    const initialStateWithCharacter = [mockCharacter];
    const result = checkedCharactersReducer(
      initialStateWithCharacter,
      uncheckAllCharacters(),
    );
    expect(result).toEqual([]);
  });

  test('checkedCharactersSelector should return the state', () => {
    const state = { checkedCharacters: initialState };
    expect(checkedCharactersSelector(state)).toEqual(initialState);
  });
});
