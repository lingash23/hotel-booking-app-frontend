import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "../components/Loader";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axiosInstance.post("/api/auth/forgot-password", {
        email: values.email,
      });
      toast.success("Password reset email sent", {
        theme: "colored",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong", {
        theme: "colored",
      });
    }
    setSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col justify-center items-center space-y-6 w-[90%] sm:w-[60%] md:w-[40%] p-8 bg-white shadow-lg rounded-lg">
          <div className="flex items-center mb-6 w-full">
            <FaArrowLeft
              onClick={() => navigate(-1)}
              className="text-blue-600 cursor-pointer hover:text-blue-800 mr-3"
              size={24}
            />
            <h1 className="text-2xl font-bold text-blue-600">
              Forgot Password
            </h1>
          </div>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-full space-y-5">
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:border-blue-500 outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-all"
                >
                  {isSubmitting ? (
                    <Loader className="size-1" />
                  ) : (
                    "Send reset link"
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <div className="flex justify-center items-center space-x-2 mt-4">
            <p className="text-gray-600">Back to</p>
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
