import Holidays from 'date-holidays';

import { getVehicle, hasDifferentDays, hasInvalidTimestamp, isTollFreeDay } from './controller/util';
import { VehicleType } from '../types/constants';
import { calculateFeeFromDay } from './controller/tollCalculator';
import { TOLL_FREE_FEE } from './controller/constants';

export const holiday = new Holidays('SE');

/**
 * Calculate the total toll fee for one day
 * @param vehicleType: vehicle of the passes.
 * @param listOfTimestamps: date and time of all passes on one day.
 * @returns Total price for the given passages
 */
const calculateTollOnDate = (vehicleType: string, listOfTimestamps: string[]): number => {
  const vehicle: VehicleType = getVehicle(vehicleType);
  if (vehicle == null) {
    throw new Error('Invalid vehicle.');
  } else if (vehicle.isTollFree) {
    return TOLL_FREE_FEE;
  } else if (listOfTimestamps.length <= 0) {
    return 0;
  } else if (hasInvalidTimestamp(listOfTimestamps)) {
    throw new Error('listOfTimestamps contains a invalid timestamp format.');
  } else if (hasDifferentDays(listOfTimestamps)) {
    throw new Error('listOfTimestamps contains timestamps of different dates.');
  } else if (isTollFreeDay(listOfTimestamps[0])) {
    return TOLL_FREE_FEE;
  } else {
    return calculateFeeFromDay(listOfTimestamps);
  }
};

export default calculateTollOnDate;
