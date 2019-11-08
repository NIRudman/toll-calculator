import assert from 'assert';
import {
  checkIfHoliday,
  checkIfWeekend,
  getSortedAndFormattedTimestamps,
  hasDifferentDays,
  hasInvalidTimestamp,
  isTollFreeDay,
} from '../src/controller/util';

describe('Util function tests', () => {
  describe('checkIfHoliday', () => {
    it('should return true if date is holiday', () => {
      const result = checkIfHoliday('2019-05-30 16:17:10'); // Kristi himmelsfärdsdag
      assert.equal(result, true);
    });

    it('should return false if date is not holiday', () => {
      const result = checkIfHoliday('2019-11-01 16:17:10');
      assert.equal(result, false);
    });
  });

  describe('checkIfWeekend', () => {
    it('should return true if date is on a weekend', () => {
      const saturdayResult = checkIfWeekend('2019-11-02 16:17:10');
      const sundayResult = checkIfWeekend('2019-11-03 16:17:10');
      assert.equal(saturdayResult && sundayResult, true);
    });

    it('should return false if date is not on a weekend', () => {
      const result = checkIfWeekend('2019-11-04 16:17:10');
      assert.equal(result, false);
    });
  });

  describe('isTollFreeDay', () => {
    it('should return true if date is on a weekend or on a holiday', () => {
      const weekendResult = isTollFreeDay('2019-11-10 16:17:10');
      const holidayResult = isTollFreeDay('2019-06-06 16:17:10'); // Nationaldan
      const bothWeekendAndHolidayResult = isTollFreeDay('2019-11-02 16:17:10'); // Alla helgons dag
      assert.equal(weekendResult && holidayResult && bothWeekendAndHolidayResult, true);
    });

    it('should return false if date is not on a weekend or on a holiday', () => {
      const result = checkIfWeekend('2019-11-04 16:17:10');
      assert.equal(result, false);
    });
  });

  describe('hasInvalidTimestamp', () => {
    it('should return true if the list of timestamps contains a invalid timestamp.', () => {
      const result = hasInvalidTimestamp(['2019-11-04 16:17:10', 'invalid timestamp']);
      assert.equal(result, true);
    });

    it('should return false if the list of timestamps only contains valid timestamps', () => {
      const result = hasInvalidTimestamp(['2019-11-04 16:17:10', '2019-11-04 16:17:15']);
      assert.equal(result, false);
    });
  });

  describe('hasDifferentDays', () => {
    it('should return true if the list of timestamps has different days in it.', () => {
      const result = hasDifferentDays(['2019-11-04 16:17:10', '2019-11-07 16:17:10']);
      assert.equal(result, true);
    });

    it('should return false if the list of timestamps does not has different days in it.', () => {
      const result = hasDifferentDays(['2019-11-04 16:17:10', '2019-11-04 16:17:15']);
      assert.equal(result, false);
    });
  });

  describe('getSortedAndFormattedTimestamps', () => {
    it('should return a sorted and formated list.', () => {
      const expectedResult = ['04:26', '08:17', '09:16', '16:17', '16:17', '17:10'];
      const result = getSortedAndFormattedTimestamps([
        '2019-11-04 16:17:10',
        '2019-11-04 16:17:15',
        '2019-11-04 08:17:15',
        '2019-11-04 09:16:55',
        '2019-11-04 04:26:55',
        '2019-11-04 17:10:55',
      ]);
      assert.deepEqual(result, expectedResult);
    });
  });
});
