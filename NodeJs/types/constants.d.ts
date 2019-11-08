export interface VehicleTypes {
  [key: string]: VehicleType;
}

export interface VehicleType {
  type: string;
  isTollFree: boolean;
}

export interface TimeAndFeeType {
  time: string;
  fee: number;
}

export interface TollFeeType {
  startTime: string;
  endTime: string;
  fee: number;
}
