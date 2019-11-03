import moment from 'moment';

import { holiday } from '../index';
import { Vehicles } from './constants';
import { VehicleType } from '../../types/constants';

export const getVehicle = (vehicleType: string): VehicleType =>
  Object.values<VehicleType>(Vehicles).find((vehicle) => vehicle.type === vehicleType) as VehicleType;

export const checkIfHoliday = (date: string): boolean => {
  const holidayResult = holiday.isHoliday(moment(date).toDate()) as boolean | object;
  // isHoliday returns an object if true and otherwise false, so check if the returned value is false to get result.
  return holidayResult !== false;
};
