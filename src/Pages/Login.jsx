import React, { useState } from 'react'
import FormInputs from '../components/FormInputs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValues;
    
    const Navigate = useNavigate()
    const Inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Email Id",
            labels: "Email"
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            labels: "Password"
        },

    ]

    const onChange = (event) => {
        setInputValues({ ...inputValues, [event.target.name]: event.target.value })
    }

    const LoginHandler = async (e) => {
        e.preventDefault()

        try {
            if (!email) {
                toast.error("Please Enter Email", {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else if (!password) {
                toast.error("Please Enter Password", {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                const LoginData = await axios.post("https://localhost:44373/api/Register/Login", {
                    email: email,
                    password: password
                })
                localStorage.setItem("Token", LoginData.data.token);

                toast.success(LoginData.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(() => {
                    Navigate("/Home")
                }, 1000)
                setInputValues("")
            }
        } catch (error) {
            toast.error(error.response.data, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    return (
        <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex 
        flex-col justify-center lg:px-1 px-6 lg:items-center">
            <form className='lg:w-[600px]  bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-2 md:p-3 lg:p-5 rounded-lg'>
                <h1 className='text-center text-3xl mb-2 text-b underline decoration-sky-900'>Login</h1>
                {Inputs.map((input) => {
                    return (
                        <FormInputs key={input.id} {...input} value={inputValues[input.name]} onChange={onChange} />
                    )
                })}
                <button className='bg-sky-500 text-white text-2xl hover:bg-sky-700 rounded-full px-5 py-2 w-full my-5' onClick={LoginHandler}>Login</button>
                <ToastContainer />
                <span>
                    <p className='text-center p-5'>Don't have account &nbsp;
                        <span className='text-blue-500 underline cursor-pointer'>
                            <Link to="/register">
                                Register here
                            </Link>
                        </span>
                    </p>
                </span>
            </form>
        </div>
    )
}

export default Login