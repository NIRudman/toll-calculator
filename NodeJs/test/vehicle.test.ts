import assert from 'assert';
import calculateTollOnDate from '../src/index';

describe('Vehicle input tests', () => {
  it('should throw error if invalid VehicleType', () => {
    assert.throws(() => calculateTollOnDate('Unknown', []));
  });

  it('should return 0 if toll free vehicle', () => {
    const result = calculateTollOnDate('Motorbike', []);
    assert.equal(result, 0);
  });

  it('should calculate the total toll fee for one day on a valid vehicle', () => {
    const listOfTimestamps = [
      '2019-11-07 05:27:10',
      '2019-11-07 03:38:10',
      '2019-11-07 16:15:10',
      '2019-11-07 22:47:10',
    ];
    const result = calculateTollOnDate('Car', listOfTimestamps);
    assert.equal(result, 18);
  });
});
