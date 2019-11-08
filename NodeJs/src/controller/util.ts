import moment from 'moment';

import { holiday } from '../index';
import { Vehicles } from './constants';
import { VehicleType } from '../../types/constants';

export const getVehicle = (vehicleType: string): VehicleType =>
  Object.values<VehicleType>(Vehicles).find((vehicle) => vehicle.type === vehicleType) as VehicleType;

/**
 * Sorts the timestamp from earliest to latest and changes format of the timestamp to hours and minutes.
 * @param listOfTimestamps: date and time of all passes on one day
 * @returns the time of all passes on one day, in the format: 'HH:mm'
 */
export const getSortedAndFormattedTimestamps = (listOfTimestamps: string[]): string[] =>
  listOfTimestamps
    .sort((firstDate: string, secondDate: string) => (moment(firstDate).isSameOrBefore(secondDate) ? -1 : 1))
    .map((date: string) => moment(date).format('HH:mm'));

export const hasDifferentDays = (listOfTimestamps: string[]): boolean => {
  const testDate = listOfTimestamps[0];
  return listOfTimestamps.some((date) => !moment(date).isSame(testDate, 'day'));
};

export const hasInvalidTimestamp = (listOfTimestamps: string[]): boolean =>
  listOfTimestamps.some((date: string) => !moment(date).isValid());

export const checkIfHoliday = (date: string): boolean => {
  const holidayResult = holiday.isHoliday(moment(date).toDate()) as boolean | object;
  // isHoliday returns an object if true and otherwise false, so check if the returned value is false to get result.
  return holidayResult !== false;
};

export const checkIfWeekend = (date: string): boolean => {
  const weekday = moment(date).format('dddd');
  return weekday === 'Saturday' || weekday === 'Sunday';
};

export const isTollFreeDay = (date: string): boolean => checkIfHoliday(date) || checkIfWeekend(date);
