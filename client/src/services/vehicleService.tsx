import { BASE_URL } from './baseUrl';
import * as base from './baseService';
import Vehicle from '../interfaces/Vehicle';

const model = 'vehicle';

export function findAllVehicles() {
  return base.findAll(model);
}

export async function findVehicleById(vehicleId: number) {
  return base.findById(model, vehicleId);
}

export async function findVehiclesByCustomerId(customerId: number) {
  const response = await fetch(`${BASE_URL}/${model}/customer/${customerId}`);
  if (response.ok) {
    return response.json();
  }
  if (response.status === 404) {
    return null;
  }
  return Promise.reject(`Could not find ${model}s for customer id ${customerId}`);
}

export async function saveVehicle(vehicle: Vehicle) {
    return base.save(model, vehicle, vehicle.vehicleId);
}

export async function deleteVehicleById(vehicleId: number) {
  return base.deleteById(model, vehicleId);
}
