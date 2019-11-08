import { TollFeeType, VehicleType, VehicleTypes } from '../../types/constants';

export const MAX_FEE_PER_DAY = 60;

export const TOLL_FREE_FEE = 0;

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

export const TollFeeSchedule: TollFeeType[] = [
  { startTime: '00:00', endTime: '05:59', fee: 0 },
  { startTime: '06:00', endTime: '06:29', fee: 8 },
  { startTime: '06:30', endTime: '06:59', fee: 13 },
  { startTime: '07:00', endTime: '07:59', fee: 18 },
  { startTime: '08:00', endTime: '08:29', fee: 13 },
  { startTime: '08:30', endTime: '14:59', fee: 8 },
  { startTime: '15:00', endTime: '15:29', fee: 13 },
  { startTime: '15:30', endTime: '16:59', fee: 18 },
  { startTime: '17:00', endTime: '17:59', fee: 13 },
  { startTime: '18:00', endTime: '18:29', fee: 8 },
  { startTime: '18:30', endTime: '23:59', fee: 0 },
];
