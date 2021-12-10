import subject from '../client/reducers/passwordReducer';

describe('password reducer', () => {
  let state;

  beforeEach(() => {
    // what should the state be initially? still initialstate?
    state = { userID: 0 }
  });

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(subject(undefined, { type: undefined})).toEqual(state);
    });
  });

  describe('unrecognized action types', () => {
    it('should return the original without any duplication', () =>{
      const action = { type: 'blerrr'};
      expect(subject(state, action)).toBe(state)
    });
  });

  describe('ADD_USER_ID', () => {
    const action = {
      type: 'ADD_USER_ID', 
      // what is the payload?
      payload: 1,
    };
    it('adds a user to our table count', () => {
      const testUserId = subject(state, action);
      expect(testUserId).toEqual({userID: 1});
    });

    it('returns a state object that will not be equal to the original', () => {
      expect(subject(state, action)).not.toBe(state);
    });
    
    it('expects the state to have a property that is not 0', () =>{
      const thisTest = subject(state, action);
      expect(thisTest.userID).not.toBe(0);
    });
    
  });
});