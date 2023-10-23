import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Customer from '../../interfaces/Customer';
import '../../styles/_customer/CustomerForm.css';

interface CustomerFormProps {
    newCustomer: Customer;
    handleFormSubmit: (e: React.FormEvent) => void;
    setNewCustomer: React.Dispatch<React.SetStateAction<Customer>>;
    errors: string[];
    setErrors: (newErrors: string[]) => void;
}

function CustomerForm({ newCustomer, handleFormSubmit, setNewCustomer, errors, setErrors }: CustomerFormProps) {

    return (
        <div className="card mb-2 custom-card">
            <div className="card-body">
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formCustomer" className="mb-2">
                        <Form.Label>First</Form.Label>
                        <Form.Control
                            type="text"
                            value={newCustomer.customerFirstName}
                            onChange={(e) =>
                                setNewCustomer({
                                    ...newCustomer,
                                    customerFirstName: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formCustomer" className="mb-2">
                        <Form.Label>Last</Form.Label>
                        <Form.Control
                            type="text"
                            value={newCustomer.customerLastName}
                            onChange={(e) =>
                                setNewCustomer({
                                    ...newCustomer,
                                    customerLastName: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formCustomer" className="mb-2">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            value={newCustomer.customerPhone}
                            onChange={(e) =>
                                setNewCustomer({
                                    ...newCustomer,
                                    customerPhone: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formCustomer" className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={newCustomer.customerEmail}
                            onChange={(e) =>
                                setNewCustomer({
                                    ...newCustomer,
                                    customerEmail: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="mt-2 w-100">
                        <i className="bi bi-box-arrow-up"></i> Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default CustomerForm;
