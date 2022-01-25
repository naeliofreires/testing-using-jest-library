const { queryString } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const object = {
      name: 'naelio',
      profession: 'developer',
    };

    expect(queryString(object)).toBe('name=naelio&profession=developer');
  });
});
