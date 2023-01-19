import axios from 'axios'
import React, { useState } from 'react'
import FormInputs from '../components/FormInputs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const [inputValues, setInputValues] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: ""
    })
    const { userName, email, password, confirmPassword, country } = inputValues;

    const Navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const Inputs = [
        {
            id: 1,
            name: "userName",
            type: "text",
            placeholder: "UserName",
            labels: "UserName"
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            labels: "Email Id"
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Password",
            labels: "Password"
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            labels: "Confirm Password"
        },
        {
            id: 5,
            name: "country",
            type: "text",
            placeholder: "Country",
            labels: "Country"
        },
    ]

    const onChange = (event) => {
        setInputValues({ ...inputValues, [event.target.name]: event.target.value })
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            if (!userName) {
                toast.error("Please Enter userName", {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else if (userName.length <= 1) {
                toast.error("User Name Minimun 2 character", {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else if (!email) {
                toast.error("Please Enter email", {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else if (!password) {
                toast.error("Please Enter Password", {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else if (password !== confirmPassword) {
                toast.error("Confirm Password must be matched Password", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            else if (!country) {
                toast.error("Please Enter country", {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                // setIsLoading(true)
                const registerData = await axios.post("https://localhost:44373/api/Register/Registration", {
                    userName: userName,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    country: country
                })
                // setIsLoading(false)
                toast.success(registerData.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setInputValues("")
                setTimeout(() => {
                    Navigate("/login")
                }, 1000)

                console.log("Data", registerData);
            }
        } catch (error) {
            console.log(error.response.data);
            toast.error(error.response.data, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    if (isLoading === true) {
        return (
            <>
                Loading...
            </>
        );
    }

    return (
        <>
            <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex 
        flex-col justify-center lg:px-1 px-6 lg:items-center">
                <form className='lg:w-[600px]  bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-2 md:p-3 lg:p-5 rounded-lg'>
                    <h1 className='text-center text-3xl mb-2 text-b underline decoration-sky-900'>Register</h1>
                    {Inputs.map((input) => {
                        return (
                            <FormInputs key={input.id} {...input} value={inputValues[input.name]} onChange={onChange} />
                        )
                    })}
                    <button className='bg-sky-500 text-white text-2xl hover:bg-sky-700 rounded-full px-5 py-2 w-full my-5' onClick={submitHandler}>Submit</button>
                    <ToastContainer />

                    <span>
                        <p className='text-center p-5'>Already have account &nbsp;
                            <span className='text-blue-500 underline cursor-pointer'>
                                <Link to="/">
                                    Login
                                </Link>
                            </span>
                        </p>
                    </span>
                </form>
            </div>
        </>
    )
}

export default Register