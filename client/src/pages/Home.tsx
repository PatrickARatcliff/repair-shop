import FullCalendarComponent from "../components/FullCalendar";
import FormErrors from "../components/FormErrors";
import { useAuth } from '../context/AuthProvider';

export default function Home() {
    const { errors } = useAuth();

    return (

        <div id="calendar" className="container mt-3">
            <FullCalendarComponent />
            <FormErrors errors={errors}/>
        </div>
    )
}