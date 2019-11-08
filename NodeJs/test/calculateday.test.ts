import assert from 'assert';
import { calculateFeeFromDay } from '../src/controller/tollCalculator';

describe('calculateFeeFromDay', () => {
  it('should return the fee: 0 of timestamps outside of toll schedule', () => {
    const listOfTimestamps = [
      '2019-11-07 05:27:10',
      '2019-11-07 03:38:10',
      '2019-11-07 19:15:10',
      '2019-11-07 22:47:10',
    ];
    const result = calculateFeeFromDay(listOfTimestamps);
    assert.equal(result, 0);
  });

  it('should return the fee: 8 of timestamps with combined price of 8', () => {
    const listOfTimestamps = [
      '2019-11-07 06:27:10', // 8
      '2019-11-07 05:38:10',
      '2019-11-07 20:15:10',
      '2019-11-07 18:47:10',
    ];
    const result = calculateFeeFromDay(listOfTimestamps);
    assert.equal(result, 8);
  });

  it('should return the fee: 16 of timestamps with combined price of 16', () => {
    const listOfTimestamps = [
      '2019-11-07 06:27:10', // 8
      '2019-11-07 05:38:10',
      '2019-11-07 18:15:10', // 8
      '2019-11-07 18:47:10',
    ];
    const result = calculateFeeFromDay(listOfTimestamps);
    assert.equal(result, 16);
  });

  it('should return the fee: 21 of timestamps with combined price of 29, with 8 removed because of multiple passes in one hour', () => {
    const listOfTimestamps = [
      '2019-11-07 06:27:10', // 8
      '2019-11-07 06:38:10', // 13
      '2019-11-07 18:15:10', // 8
      '2019-11-07 18:47:10',
    ];
    const result = calculateFeeFromDay(listOfTimestamps);
    assert.equal(result, 21);
  });

  it('should return the fee: 26 of timestamps with combined price of 47, with 8, 13 removed because of multiple passes in one hour', () => {
    const listOfTimestamps = [
      '2019-11-07 05:59:10',
      '2019-11-07 06:10:10', // 8
      '2019-11-07 06:38:10', // 13
      '2019-11-07 07:09:10', // 18
      '2019-11-07 18:20:10', // 8
      '2019-11-07 21:20:10',
    ];
    const result = calculateFeeFromDay(listOfTimestamps);
    assert.equal(result, 26);
  });

  it('should return the fee: 39 of timestamps with combined price of 47, with 8 removed because of multiple passes in one hour', () => {
    const listOfTimestamps = [
      '2019-11-07 06:10:10', // 8
      '2019-11-07 06:38:10', // 13
      '2019-11-07 07:11:10', // 18
      '2019-11-07 18:20:10', // 8
      '2019-11-07 21:20:10',
    ];
    const result = calculateFeeFromDay(listOfTimestamps);
    assert.equal(result, 39);
  });

  it('should return the fee: 60 if the combined price exceeds the max toll of 60', () => {
    const listOfTimestamps = [
      '2019-11-07 06:10:10', // 8
      '2019-11-07 06:38:10', // 13
      '2019-11-07 07:11:10', // 18
      '2019-11-07 13:22:10', // 8
      '2019-11-07 15:42:10', // 18
      '2019-11-07 18:20:10', // 8
      '2019-11-07 21:20:10',
    ];
    const result = calculateFeeFromDay(listOfTimestamps);
    assert.equal(result, 60);
  });
});
