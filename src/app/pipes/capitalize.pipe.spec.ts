import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('create an instance', () => {
    const pipe = new CapitalizePipe();
    expect(pipe).toBeTruthy();
  });

  it('Debería capitalizar solo la primera letra', () => {
    expect(pipe.transform('hola')).toBe('Hola');
    expect(pipe.transform('mUNDO')).toBe('Mundo');
  });

  it('No devuelve valor si es null o está vacío', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('Debería devolver la función si solo es una letra', () => {
    expect(pipe.transform('a')).toBe('A');
    expect(pipe.transform('Z')).toBe('Z');
  });
});
