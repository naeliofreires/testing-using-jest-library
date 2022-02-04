import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const object = {
      name: 'naelio',
      profession: 'developer',
    };

    expect(queryString(object)).toBe('name=naelio&profession=developer');
  });

  it('should create a valid query string even when an array is passed as a value', () => {
    const object = {
      name: 'naelio',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(object)).toBe('name=naelio&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const object = {
      name: 'naelio',
      abilities: {
        first: 'JS',
        secondary: 'TDD',
      },
    };

    expect(() => {
      queryString(object);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a queryString to object', () => {
    const qs = 'name=naelio&profession=developer';

    expect(parse(qs)).toEqual({
      name: 'naelio',
      profession: 'developer',
    });
  });

  it('should convert a queryString of a single key-value', () => {
    const qs = 'name=naelio';

    expect(parse(qs)).toEqual({
      name: 'naelio',
    });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Naelio&abilities=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'Naelio',
      abilities: ['JS', 'TDD'],
    });
  });
});
