import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { API_BASE_URL } from "./Config";

export default function RegisterPage() {

   useEffect(() => {
        let token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if(token){
          navigate('/');
        }
      },[]);
    const validationSchema = Yup.object({
        email: Yup.string().required().email(),
        password: Yup.string().required().min(8, "Password must be at least 8 characters")

  // Capital letter
  .matches(/[A-Z]/, "Password must contain at least one capital letter")

  // At least one number
  .matches(/[0-9]/, "Password must contain at least one number")

  // Special character
  .matches(/[@$!%*?&#]/, "Password must contain at least one special character")

  // No sequential numbers
  .test(
    "no-sequential-numbers",
    "Password must not contain sequential numbers",
    (value) => {
      if (!value) return true;

      // Extract numbers from password
      const numbers = value.replace(/\D/g, "");

      // Check for sequential numbers
      for (let i = 0; i < numbers.length - 1; i++) {
        if (+numbers[i + 1] === +numbers[i] + 1) {
          return false;
        }
      }

      return true;
    }
  ),
  userName: Yup.string().required()
    })

    //has cappital letter
    //has atleast one number
    //has special character
  //متكتبش ارقام متتاليه ورا بعض


    
    const navigate = useNavigate()

    const handleSubmit = (values) => {
        let domain = API_BASE_URL;
        let endPoint = '/api/auth/local/register';
        let url = domain + endPoint;

        let data = {
            username: values.userName,
            email: values.email,
           password: values.password
        }

        axios.post(url,data).then((res) => {
            let token = res.data.jwt;
            toast.success('Register Successed!');
            navigate('/');
            sessionStorage.setItem('token',token);
            console.log(res.data.jwt);

        }).catch((err) => {
            toast.error(err.response.data.error.message);
            console.log(err);
        });
console.log(values);
    }

  return (

    <div className="w-full h-dvh flex items-center justify-center bg-gray-950 text-white">
      <Formik initialValues={{
        email:'',
        password:'',
        userName:''
      }} onSubmit={handleSubmit} validationSchema={validationSchema}>
          <Form className="bg-gray-900 shadow rounded-3xl p-4 flex flex-col gap-3 w-100">
            <h1>Welcome,Please Register</h1>
            <Field className='w-full input' name='userName' placeholder='Enter Your Username'/>
            <ErrorMessage name='userName' component={'p'} className="text-red-500"/>
            <Field className='w-full input' name='email' placeholder='Enter Your Email'/>
            <ErrorMessage name='email' component={'p'} className="text-red-500"/>
            <Field className='w-full input' name='password' placeHolder='Enter Your Password'/>
            <ErrorMessage name='password' component={'p'} className="text-red-500"/>
           
            
            <button type="submit" className="btn btn-success w-full">Register</button>
            <Link to={'/login'} className="btn btn-success">
            Already have account,Please login</Link>
          </Form>
      </Formik>
    </div>
  )
}
