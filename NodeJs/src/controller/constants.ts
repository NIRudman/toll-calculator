import { VehicleType, VehicleTypes } from '../../types/constants';

export const Vehicles: VehicleTypes = {
  CAR: {
    type: 'Car',
    isTollFree: false,
  } as VehicleType,
  MOTORBIKE: {
    type: 'Motorbike',
    isTollFree: true,
  } as VehicleType,
  TRACTOR: {
    type: 'Tractor',
    isTollFree: true,
  } as VehicleType,
  EMERGENCY: {
    type: 'Emergency',
    isTollFree: true,
  } as VehicleType,
  DIPLOMAT: {
    type: 'Diplomat',
    isTollFree: true,
  } as VehicleType,
  FOREIGN: {
    type: 'Foreign',
    isTollFree: true,
  } as VehicleType,
  MILITARY: {
    type: 'Military',
    isTollFree: true,
  } as VehicleType,
};
