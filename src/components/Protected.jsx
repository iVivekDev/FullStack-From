import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Protected = (props) => {
    const { Component } = props;
    const navigate = useNavigate()
    useEffect(() => {
        let token = localStorage.getItem("Token")
        if (!token) {
            navigate("/")
            toast.error("Please login First", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    })

    return (
        <div>
            <Component />
            <ToastContainer />
        </div>
    )
}

export default Protected