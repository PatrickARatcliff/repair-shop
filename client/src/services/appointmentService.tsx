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

export async function saveAppointment(appointment: Appointment) {
    return base.save(model, appointment, appointment.appointmentId);
}

export async function deleteById(appointmentId: number) {
    return base.deleteById(model, appointmentId);
}