import { Vehicles } from './constants';
import { VehicleType } from '../../types/constants';

export const getVehicle = (vehicleType: string): VehicleType =>
  Object.values<VehicleType>(Vehicles).find((vehicle) => vehicle.type === vehicleType) as VehicleType;
