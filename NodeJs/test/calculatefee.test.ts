import assert from 'assert';
import { calculateFeeFromTime } from '../src/controller/tollCalculator';

describe('calculateFeeFromTime', () => {
  it('should return the fee: 0 between the time 0:00 to 05:59', () => {
    const result = calculateFeeFromTime('04:00');
    assert.equal(result, 0);
  });

  it('should return the fee: 8 between the time 6:00 to 06:29', () => {
    const result = calculateFeeFromTime('06:10');
    assert.equal(result, 8);
  });

  it('should return the fee: 13 between the time 6:30 to 06:59', () => {
    const result = calculateFeeFromTime('06:30');
    assert.equal(result, 13);
  });

  it('should return the fee: 18 between the time 7:00 to 07:59', () => {
    const result = calculateFeeFromTime('07:33');
    assert.equal(result, 18);
  });

  it('should return the fee: 13 between the time 8:00 to 08:29', () => {
    const result = calculateFeeFromTime('08:29');
    assert.equal(result, 13);
  });

  it('should return the fee: 8 between the time 8:30 to 14:59', () => {
    const result = calculateFeeFromTime('10:29');
    assert.equal(result, 8);
  });

  it('should return the fee: 13 between the time 15:00 to 15:29', () => {
    const result = calculateFeeFromTime('15:09');
    assert.equal(result, 13);
  });

  it('should return the fee: 18 between the time 15:30 to 16:59', () => {
    const result = calculateFeeFromTime('16:59');
    assert.equal(result, 18);
  });

  it('should return the fee: 13 between the time 17:00 to 17:59', () => {
    const result = calculateFeeFromTime('17:51');
    assert.equal(result, 13);
  });

  it('should return the fee: 8 between the time 18:00 to 18:29', () => {
    const result = calculateFeeFromTime('18:20');
    assert.equal(result, 8);
  });

  it('should return the fee: 0 between the time 18:30 to 23:59', () => {
    const result = calculateFeeFromTime('21:20');
    assert.equal(result, 0);
  });
});
