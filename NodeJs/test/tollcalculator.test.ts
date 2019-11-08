import assert from 'assert';
import calculateTollOnDate from '../src/index';

describe('calculateTollOnDate input tests', () => {
  it('should return 0 if list of timestamps is empty', () => {
    const result = calculateTollOnDate('Car', []);
    assert.equal(result, 0);
  });

  it('should throw error if timestamp has invalid date', () => {
    assert.throws(() => calculateTollOnDate('Car', ['null']));
  });

  it('should throw error if list of timestamps has different dates', () => {
    const listOfTimestamps = [
      '2019-11-07 05:27:10',
      '2019-11-08 03:38:10',
      '2019-11-07 19:15:10',
      '2019-11-09 22:47:10',
    ];
    assert.throws(() => calculateTollOnDate('Car', listOfTimestamps));
  });
});
