import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/FormErrors.css';


interface FormErrorsProps {
  errors: string[] | null;
}

function FormErrors({ errors }: FormErrorsProps) {
  const { setErrors} = useAuth();


  if (!errors || !errors.length) return null;
  console.log(errors.length)
  errors.forEach((error) => {
    toast.error(error, {
      className: 'toast-notification',
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  });

  setErrors([]);

  return null;
}

export default FormErrors;

