import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { login } = useAuth();

  const handleLogin = (values, { setSubmitting, setErrors }) => {
    login(values, { setSubmitting, setErrors });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen shadow-md shadow-green-500 bg-gray-100">
        <div className="flex flex-col justify-center items-center space-y-6 w-[85%] md:w-[30%] p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-blue-600 w-full">
            Welcome Back,
          </h1>
          <h2 className="text-lg font-semibold text-blue-600 w-full">
            Login to your account!
          </h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="w-full space-y-5">
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border-2 border-blue-300 rounded-md focus:border-blue-500 outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border-2 border-blue-300 rounded-md focus:border-blue-500 outline-none"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="flex justify-end items-center">
                  <Link
                    to="/forgot-password"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-all"
                >
                  {isSubmitting ? <Loader small /> : "Login"}
                </button>
                <ErrorMessage
                  name="general"
                  component="div"
                  className="text-red-500 text-center text-sm mt-2"
                />
              </Form>
            )}
          </Formik>
          <div className="flex justify-center items-center space-x-2">
            <p className="text-blue-600">Don't have an account?</p>
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
