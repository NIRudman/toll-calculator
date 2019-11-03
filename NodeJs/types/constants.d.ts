export interface VehicleTypes {
  [key: string]: VehicleType;
}

export interface VehicleType {
  type: string;
  isTollFree: boolean;
}
