import { useState, useEffect } from 'react';
import { Spinner, Button, Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { saveCustomer, findAllCustomers } from '../../services/customerService';
import { useAuth } from "../../context/AuthProvider";
import { deleteCustomerById } from '../../services/customerService';

import Customer from "../../interfaces/Customer";
import CustomerTable from '../../components/_customer/CustomerTable';
import CustomerForm from '../../components/_customer/CustomerForm';

import { toast } from 'react-toastify';

import '../../styles/_customer/Customers.css'


function Customers() {
    const { signedIn, errors, setErrors, userData } = useAuth();
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const userId = userData ? userData.userId : 0;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newCustomer, setNewCustomer] = useState<Customer>({
        customerId: 0,
        customerFirstName: "",
        customerLastName: "",
        customerPhone: "",
        customerEmail: "",
        important: false,
    });
    const [customers, setCustomers] = useState<Customer[]>([]);
    const containerHeight = isAccordionOpen ? '38vh' : '75vh';
    const navigate = useNavigate();

    if (!signedIn) {
        navigate("/")
    }

    const handleAddCustomerClick = () => {
        setIsAccordionOpen((prevIsAccordionOpen) => !prevIsAccordionOpen);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(newCustomer);

        saveCustomer(newCustomer).then((savedCustomer: Customer) => {
            const updatedCustomers = [...customers, savedCustomer];
            setCustomers(updatedCustomers);
            setNewCustomer({
                customerId: 0,
                customerFirstName: "",
                customerLastName: "",
                customerPhone: "",
                customerEmail: "",
                important: false,
            });
        });
    };

    const handleDelete = async (customerId: number) => {
        try {
            await deleteCustomerById(customerId);
            const updatedCustomers = customers.filter(customer => customer.customerId !== customerId);
            setCustomers(updatedCustomers);
        } catch (error) {
            setErrors([`Error deleting appointment: ${error}`]);
            toast.error(`Error deleting appointment: ${error}`);
        } finally {
            setShowDeleteModal(false);
        }
    }

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const customers = await findAllCustomers();
                setCustomers(customers);
                setIsLoading(false);
            } catch (error) {
                setErrors([`Error fetching customers: ${error}`]);
                toast.error(`Error fetching customers: ${error}`);
                setIsLoading(false);
            }
        };

        fetchCustomers();
    }, []);


    return (
        <div className="container mt-3 customers-container">
            <Accordion activeKey={isAccordionOpen ? '0' : ''}>
                <Button
                    variant="success"
                    className="w-100"
                    onClick={handleAddCustomerClick}
                    style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                >
                    <i className="bi bi-person-add"></i> Add New Customer
                </Button>
                <Accordion.Collapse eventKey="0">
                    <div className="accordion">
                        <CustomerForm
                            newCustomer={newCustomer}
                            handleFormSubmit={handleFormSubmit}
                            setNewCustomer={setNewCustomer}
                            errors={errors}
                            setErrors={setErrors}
                        />
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
                    <CustomerTable
                        customers={customers}
                        height={containerHeight}
                        onDelete={handleDelete}
                    />
                </div>
            )}
        </div>
    );
}

export default Customers;
