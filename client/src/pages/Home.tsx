import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import { Button } from 'react-bootstrap';

import FullCalendarComponent from "../components/FullCalendar";

export default function Home() {
    const { signedIn } = useAuth();
    const navigate = useNavigate();

    if (!signedIn) {
        navigate("/")
    };

    return (
        <>
            <section aria-label='home page when signed-in'>
                <div id="calendar" className="container mt-3">
                    <FullCalendarComponent />
                    <Button
                        variant="primary"
                        className="w-100"
                        onClick={() => navigate("/appointment")}
                        style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    >
                        <i className="bi bi-calendar2-week"></i> Manage Appointments
                    </Button>
                </div>
            </section>
        </>
    )
}