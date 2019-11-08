import moment from 'moment';
import { TimeAndFeeType } from '../../types/constants';
import { MAX_FEE_PER_DAY, TollFeeSchedule } from './constants';
import { getSortedAndFormattedTimestamps } from './util';

export const calculateFeeFromTime = (time: string): number => {
  const tollFee = TollFeeSchedule.find(
    ({ startTime, endTime }) =>
      moment(time, 'HH:mm').isSameOrAfter(moment(startTime, 'HH:mm')) &&
      moment(time, 'HH:mm').isSameOrBefore(moment(endTime, 'HH:mm')),
  );
  if (tollFee == null) {
    throw new Error(`Something went wrong, couldn't match the time: ${time} with the toll schedule.`);
  } else {
    return tollFee.fee;
  }
};

/**
 * Calculate the total toll fee for one day
 * @param listOfTimestamps: date and time of all passes on one day
 * @returns Total price for the given passages
 */
export const calculateFeeFromDay = (listOfTimestamps: string[]): number => {
  const listOfTimeAndFees: TimeAndFeeType[] = getSortedAndFormattedTimestamps(listOfTimestamps).map((date) => ({
    time: date,
    fee: calculateFeeFromTime(date),
  }));
  // Filter the list by the rules:
  // "A vehicle should only be charged once an hour."
  // "In the case of multiple fees in the same hour period, the highest one applies."
  const filteredTimeAndFees = listOfTimeAndFees.reduce(
    (validFees: TimeAndFeeType[], { time: nextTime, fee: nextFee }) => {
      const currentIndex = validFees.findIndex(
        ({ time }) => moment(nextTime, 'HH:mm').diff(moment(time, 'HH:mm'), 'minutes', true) <= 60,
      );
      if (currentIndex >= 0) {
        const { time: currentTime, fee: currentFee } = validFees[currentIndex];
        const newValidFees = [...validFees];
        newValidFees.splice(currentIndex, 1, { time: currentTime, fee: nextFee >= currentFee ? nextFee : currentFee });
        return newValidFees;
      } else if (nextFee === 0) {
        // Only save fees with value, so the hour passes only get counted on passes with toll.
        return validFees;
      } else {
        return [...validFees, { time: nextTime, fee: nextFee }];
      }
    },
    [],
  );
  const feeOfDay = filteredTimeAndFees.reduce((fee, { fee: currentFee }) => fee + currentFee, 0);
  // If the fee exceeds the max fee of a day, then return the max fee.
  return feeOfDay > MAX_FEE_PER_DAY ? MAX_FEE_PER_DAY : feeOfDay;
};
