import selectedCharacterReducer, {
  setSelectedCharacter,
} from '../slices/selectedCharacterSice.ts';
import { mockCharacter } from '../../__mocks__/characters.ts';

const initialState = {
  character: null,
};

describe('selectedCharacter slice', () => {
  test('should return the initial state', () => {
    const result = selectedCharacterReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  test('should handle setSelectedCharacter', () => {
    const action = { type: setSelectedCharacter.type, payload: mockCharacter };
    const result = selectedCharacterReducer(initialState, action);

    expect(result.character).toEqual(mockCharacter);
  });
});
