import assert from 'assert';
import calculateTollOnVehicle from '../src/index';

describe('Toll-calculator tests', () => {
  describe('Vehicle input tests', () => {
    it('should return error if invalid VehicleType', () => {
      assert.throws(() => calculateTollOnVehicle('Unknown', []));
    });

    it('should return 0 if toll free vehicle', () => {
      const result = calculateTollOnVehicle('Motorbike', []);
      assert.equal(result, 0);
    });
  });
});
