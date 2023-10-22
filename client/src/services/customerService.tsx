import { BASE_URL } from './baseUrl';
import * as base from './baseService';
import Customer from '../interfaces/Customer';

const model = 'customer';

export function findAllCustomers() {
  return base.findAll(model);
}

export async function findCustomerById(customerId: number) {
  return base.findById(model, customerId);
}

export async function saveCustomer(customer: Customer) {
    return base.save(model, customer, customer.customerId);
}

export async function deleteCustomerById(customerId: number) {
  return base.deleteById(model, customerId);
}
