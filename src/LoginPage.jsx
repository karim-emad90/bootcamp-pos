import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { API_BASE_URL } from "./Config";
import LoginCarousel from "./LoginCarousel";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";



export default function LoginPage() {
    useEffect(() => {
      console.log('k');
        let token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if(token){
          navigate('/');
        }
      },[]);
    const validationSchema = Yup.object({
        email: Yup.string().required().email(),
        password: Yup.string().required()
    })

    
    const navigate = useNavigate();

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
            localStorage.setItem('guest',false);
            values.isChecked ? localStorage.setItem('token',token) : sessionStorage.setItem('token',token);
            console.log(res.data.jwt);

        }).catch((err) => {
            toast.error(err.response.data.error.message);
            console.log(err);
        });
console.log(values);
    }

    const navigateGuest = ()=> {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      localStorage.setItem('guest',true);
      navigate('/');
    }

  return (

    <div className="w-full h-dvh overflow-scroll  flex flex-col  lg:flex-row   lg:gap-5  bg-[#ffffff] text-white">
      <div className="w-full lg:w-[50%] ">
        <LoginCarousel/>
      </div>
      <div className="flex h-dvh  justify-center w-full lg:w-[50%] bg-[#ffffff]">
         <Formik initialValues={{
        email:'',
        password:'',
        isChecked: false
      }} onSubmit={handleSubmit} validationSchema={validationSchema}>
          <Form className=" rounded-3xl p-4 flex flex-col justify-center gap-3 w-full lg:w-[60%]">
            <h1 className="text-[#070707] text-3xl font-bold self-center lg:self-start">Welcome.Back!</h1>
            <p className="text-sm text-grey self-center lg:self-start">Please,sign in to continue</p>
            <Field className='w-full input bg-[#f5f6f1] text-grey' name='email' placeholder='Enter Your Email'/>
            <ErrorMessage name='email' component={'p'} className="text-red-500"/>
            <Field className='w-full input bg-[#f5f6f1] text-grey'  name='password' placeholder='Enter Your Password'/>
            <ErrorMessage name='password' component={'p'} className="text-red-500"/>
            <label>
              <Field name='isChecked' className='checkbox checkbox-primary text-success bg-[#f5f6f1]' type='checkbox' />
              Remember Me
            </label>
            
            <button type="submit" className="btn btn-warning w-full text-black font-bold">Sign In</button>
            <Link to={'/register'} className="btn btn-success text-black font-bold">
            Register</Link>
            <Link to={'/'} onClick={navigateGuest} className="text-blue-700 text-xl lg:text-lg self-center lg:self-end text-decoration-line: underline">Guest Login</Link>
            <p className="text-grey self-center">or</p>
            <section className="w-full flex justify-between">
              <a href="https://myaccount.google.com/?pli=1" target="_blank" className="w-[45%] h-[50px] flex gap-2 items-center justify-center rounded-xl border-gray-400 border-[0.25px]">
               
             <FcGoogle className="text-2xl" />
             <p className="text-black text-sm">Sign up with Google</p>
              </a>
              <a href="https://www.facebook.com/" target="_blank" className="w-[45%] h-[50px] flex gap-2 items-center justify-center rounded-xl border-gray-400 border-[0.25px]">
                  <a>
             <ImFacebook2 className="text-blue-700 text-2xl" />
              </a>
             <p className="text-black text-sm">Sign up with Facebook</p>
            
              </a>
             
             
            </section>
          </Form>
      </Formik>
      </div>
      
    </div>
  )
}
