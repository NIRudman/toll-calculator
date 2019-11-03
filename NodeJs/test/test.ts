import assert from 'assert';
import calculateTollOnVehicle from '../src/index';
import { checkIfHoliday } from '../src/controller/util';

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

  describe('Date input tests', () => {
    describe('checkIfHoliday', () => {
      it('should return true if date is holiday', () => {
        const result = checkIfHoliday('2019-12-24 16:17:10');
        assert.equal(result, true);
      });

      it('should return false if date is not holiday', () => {
        const result = checkIfHoliday('2019-11-01 16:17:10');
        assert.equal(result, false);
      });
    });
  });
});
