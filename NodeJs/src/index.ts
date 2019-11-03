import Holidays from 'date-holidays';

import { getVehicle } from './controller/util';
import { VehicleType } from '../types/constants';
import { calculateFee } from './controller/tollCalculator';

export const holiday = new Holidays('SE');

const calculateTollOnVehicle = (vehicleType: string, dates: Array<string>): number => {
  const vehicle: VehicleType = getVehicle(vehicleType);
  if (vehicle == null) {
    throw new Error('Ogiltigt fordon');
  } else if (vehicle.isTollFree) {
    return 0;
  } else {
    return calculateFee(dates);
  }
};

export default calculateTollOnVehicle;
