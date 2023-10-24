import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Button, Accordion } from 'react-bootstrap';

import { findCustomerById, saveCustomer, deleteCustomerById } from '../../services/customerService';
import { useAuth } from "../../context/AuthProvider";

import Customer from '../../interfaces/Customer';
import CustomerForm from '../../components/_customer/CustomerForm';
import CustomerCard from '../../components/_customer/CustomerCard';

import '../../styles/_customer/CustomerDetail.css'

function VehicleDetail() {
    const { errors, setErrors, userData } = useAuth();
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const userId = userData ? userData.userId : 0;
    const { customerId } = useParams();
    const [customer, setCustomer] = useState<Customer>({
        customerId: 0,
        customerFirstName: "",
        customerLastName: "",
        customerPhone: "",
        customerEmail: "",
        important: false,
    });
    const navigate = useNavigate();
    const containerHeight = isAccordionOpen ? '40vh' : '75vh';

    useEffect(() => {
        fetchCustomerDetails();
    }, [findCustomerById]);

    const fetchCustomerDetails = async () => {
        try {
            const customerData = await findCustomerById(Number(customerId));
            setCustomer(customerData);
            setIsLoading(false);
        } catch (error) {
            setErrors([`Error fetching customer details: ${error}`]);
            setIsLoading(false);
        }
    };

    const handleEditCustomerClick = () => {
        setIsAccordionOpen(prevIsAccordionOpen => !prevIsAccordionOpen);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (customer) {
    
            setIsAccordionOpen(false);
    
            try {
                const errors = await saveCustomer(customer);
                if (!errors) {
                    await fetchCustomerDetails();
                } else {
                    console.log(errors);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    
    const handleDeleteCustomer = async (customerId: number) => {
        try {
            await deleteCustomerById(customerId);
            navigate("/customer");
        } catch (error) {
            setErrors([`Error deleting customer: ${error}`]);
        }
    };

    return (
        <div className="container mt-3 vehicle-detail-container">
            <Accordion activeKey={isAccordionOpen ? '0' : ''}>
                <Button
                    variant="warning"
                    className="w-100"
                    onClick={handleEditCustomerClick}
                    style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                >
                    <i className="bi bi-pencil-square"></i> Edit Customer
                </Button>
                <Accordion.Collapse eventKey="0">
                    <div className="accordion">
                        {customer && (
                            <CustomerForm
                                newCustomer={customer}
                                handleFormSubmit={handleFormSubmit}
                                setNewCustomer={setCustomer}
                                errors={errors}
                                setErrors={setErrors}
                            />
                        )}
                    </div>
                </Accordion.Collapse>
            </Accordion>
            {isLoading ? (
                <div className="container mt-3 spinner-container">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    {customer && (
                        <CustomerCard 
                            customer={customer}
                            onDeleteClick={handleDeleteCustomer}
                            height={containerHeight}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default VehicleDetail;
