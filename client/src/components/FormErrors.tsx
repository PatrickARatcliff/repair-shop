import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/FormErrors.css';


interface FormErrorsProps {
  errors: string[] | null;
}

function FormErrors({ errors }: FormErrorsProps) {
  if (!errors || !errors.length) return null;

  errors.forEach((error) => {
    toast.error(error, {
      className: 'toast-notification',
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  });

  return null;
}

export default FormErrors;

