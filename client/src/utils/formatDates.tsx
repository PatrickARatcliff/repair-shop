import Appointment from "../interfaces/Appointment"

export function formatDateString(input: string) {
  if (input.split('').includes('-')) {
    const parts = input.split('-');
    if (parts.length === 3) {
        return `${parts[1]}-${parts[2]}-${parts[0]}`;
    } else {
        return input;
    }
  } 
  return input;
}

export function sortDates(appointments: Appointment[]) {
  return [...appointments].sort((a, b) => {
    const dateA = new Date(a.appointmentDate).getTime();
    const dateB = new Date(b.appointmentDate).getTime();
    return dateA - dateB;
  });
}

