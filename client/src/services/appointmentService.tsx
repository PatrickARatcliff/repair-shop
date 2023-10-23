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

        const response = await base.save(model, appointment, appointment.appointmentId);
        console.log(`saveAppointment: ${response}`)
        // if(!response || response === null) {
        //     console.log('saveAppointment: no response || null');
        //     return null;
        // } else if (response.status === 200) {
        //     const data = await response.text();
        //     if (data) {
        //         return JSON.parse(data);
        //     } else {
        //         return null;
        //     }
        // } else if (response.status >= 400 && response.status < 600) {
        //     console.error('Unexpected response status:', response.status);
        //     throw new Error(`Unexpected response status: ${response.status}`);
        // } else {
        //     console.error('Unexpected response status:', response.status);
        //     throw new Error('Unexpected response status');
        // }
        return response;
}



export async function deleteAppointmentById(appointmentId: number) {
    return base.deleteById(model, appointmentId);
}