import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { API_BASE_URL } from "./Config";

export default function LoginPage() {
    useEffect(() => {
        let token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if(token){
          navigate('/');
        }
      },[]);
    const validationSchema = Yup.object({
        email: Yup.string().required().email(),
        password: Yup.string().required()
    })

    
    const navigate = useNavigate()

    const handleSubmit = (values) => {
        let domain = API_BASE_URL;
        let endPoint = '/api/auth/local';
        let url = domain + endPoint;

        let data = {
            identifier: values.email,
            password: values.password
        }

        axios.post(url,data).then((res) => {
            let token = res.data.jwt;
            toast.success('Login Successed!');
            navigate('/');
            values.isChecked ? localStorage.setItem('token',token) : sessionStorage.setItem('token',token);
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
        isChecked: false
      }} onSubmit={handleSubmit} validationSchema={validationSchema}>
          <Form className="bg-gray-900 shadow rounded-3xl p-4 flex flex-col gap-3 w-100">
            <h1>Please Login To The System</h1>
            <Field className='w-full input' name='email' placeholder='Enter Your Email'/>
            <ErrorMessage name='email' component={'p'} className="text-red-500"/>
            <Field className='w-full input' name='password' placeholder='Enter Your Password'/>
            <ErrorMessage name='password' component={'p'} className="text-red-500"/>
            <label>
              <Field name='isChecked' className='checkbox checkbox-primary' type='checkbox' />
              Remember Me
            </label>
            
            <button type="submit" className="btn btn-primary w-full">Login</button>
            <Link to={'/register'} className="btn btn-success">
            Don't have account,create new</Link>
          </Form>
      </Formik>
    </div>
  )
}
