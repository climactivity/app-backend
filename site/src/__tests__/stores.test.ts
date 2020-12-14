import { baseUrl } from "../stores";

test('empty base url when __env is not loaded', () => {
    expect(baseUrl.toBe(''));
  });
  