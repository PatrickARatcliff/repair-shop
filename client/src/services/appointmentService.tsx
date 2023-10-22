import { BASE_URL } from './baseUrl';
import * as base from "./baseService";
import Appointment from "../interfaces/Appointment"
const model = "appointment";

export function findAllAppointments() {
        return base.findAll(model);
}

export async function findAppointmentById(appointmentId: number) {
    return base.findById(model, appointmentId);
}

export async function findAppointmentsByVehicleId(vehicleId: number) {
    const response = await fetch(`${BASE_URL}/${model}/vehicle/${vehicleId}`);
    if (response.ok) {
        return response.json();
    }
    if (response.status === 404) {
        return null;
    }
    return Promise.reject(`could not find ${model}s for vehicle id ${vehicleId}`);
}

export async function findAppointmentsByUserId(userId: number) {
    const response = await fetch(`${BASE_URL}/${model}/user/${userId}`);
    if (response.ok) {
        return response.json();
    }
    if (response.status === 404) {
        return null;
    }
    return Promise.reject(`could not find ${model}s for user id ${userId}`);
}
//  TODO: Error while saving appointment: SyntaxError: Unexpected end of JSON input Uncaught (in promise) SyntaxError: Unexpected end of JSON input
export async function saveAppointment(appointment: Appointment) {
    try {
        const response = await base.save(model, appointment, appointment.appointmentId);
        if (response.status === 204) {
            return null;
        } else if (response.status === 200) {
            return response.json();
        } else {
            console.error('Unexpected response status:', response.status);
            throw new Error('Unexpected response status');
        }
    } catch (error) {
        console.error('Error while saving appointment:', error);
        throw error;
    }
}


export async function deleteAppointmentById(appointmentId: number) {
    return base.deleteById(model, appointmentId);
}