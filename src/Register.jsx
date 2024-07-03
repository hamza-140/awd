import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

function Register() {
  // Initialize states for all input fields
  const [allInputData, setInputData] = useState({
    name: "",
    fname: "",
    email: "",
    password: "",
    cpassword: "",
    status: "",
  });
  const [errors, setErrors] = useState({});

  const onChangeInput = (event) => {
    // Name of variable "event" can be changed
    setInputData({ ...allInputData, [event.target.name]: event.target.value });
    const { name, value } = event.target;

    // Clear the specific error for the current input field
    setErrors((prevErrors) => ({ ...prevErrors, [event.target.name]: "" }));
  };

  const validateForm = () => {
    let formErrors = {};

    if (!allInputData.name) formErrors.name = "Name is required";
    if (!allInputData.fname) formErrors.fname = "Father Name is required";
    if (!allInputData.email) formErrors.email = "Email is required";
    if (!allInputData.password) formErrors.password = "Password is required";
    if (!allInputData.cpassword)
      formErrors.cpassword = "Confirm Password is required";
    if (!allInputData.status) formErrors.status = "Status is required";

    return formErrors;
  };

  const savingData = async (
    name,
    fname,
    email,
    password,
    cpassword,
    status
  ) => {
    const myEndpoint = "http://localhost:5000/user/register-user/";
    try {
      const response = await fetch(myEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          fname,
          email,
          password,
          cpassword,
          status,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.statusText}`);
      }
      const newUser = {
        name: name,
        fname: fname,
        email: email,
        password: password,
        status: status,
      };
      const myJsonData = await response.json();
      console.log("myJsonData: ", myJsonData);

      //navigate to next component
      Swal.fire({
        title: "User Registered!",
        text: "User registered successfully!",
        icon: "success",
      });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const onSubmitHandle = async (event) => {
    event.preventDefault(); //prevent page loading when click on button
    const isValid = validateForm();
    if (isValid) {
      await savingData(
        allInputData.name,
        allInputData.fname,
        allInputData.email,
        allInputData.password,
        allInputData.cpassword,
        allInputData.status
      );
      //setting all input fields blank
      setInputData({
        name: "",
        fname: "",
        email: "",
        password: "",
        cpassword: "",
        status: "",
      });
    }
  };

  return (
    <div>
      {/* Registration Page Container */}
      <div className="p-5">
        <div className="text-center m-2">
          <h2 className="text-3xl font-bold dark:text-white">Registration</h2>
        </div>
        <div className="text-center">
          <p>Register yourself to use our services.</p>
        </div>
        <div>
          <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:m-2 lg:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <form
                    action="#"
                    className="space-y-4 md:space-y-6"
                    onSubmit={onSubmitHandle}
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Full Name
                      </label>
                      <input
                        data-tooltip-id="name"
                        data-tooltip-content="Please enter your name!"
                        data-tooltip-variant="error"
                        name="name"
                        id="name"
                        value={allInputData.name}
                        onChange={onChangeInput}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Elon Musk"
                      />
                      {allInputData.name === "" && <Tooltip id="name" />}

                      {errors.name && (
                        <>
                          <Tooltip id="name" content={errors.name} />
                          <p className="text-sm text-red-600">{errors.name}</p>
                        </>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="fname"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Father Name
                      </label>
                      <input
                        data-tooltip-id="fname"
                        data-tooltip-content="Please enter your father name!"
                        data-tooltip-variant="error"
                        name="fname"
                        id="fname"
                        value={allInputData.fname}
                        onChange={onChangeInput}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Musk Sr."
                      />
                      {allInputData.fname === "" && <Tooltip id="fname" />}

                      {errors.fname && (
                        <>
                          <Tooltip id="fname" content={errors.fname} />
                          <p className="text-sm text-red-600">{errors.fname}</p>
                        </>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        data-tooltip-id="email"
                        data-tooltip-content="Please enter your email!"
                        data-tooltip-variant="error"
                        type="email"
                        name="email"
                        id="email"
                        value={allInputData.email}
                        onChange={onChangeInput}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@email.com"
                      />
                      {allInputData.email === "" && <Tooltip id="email" />}

                      {errors.email && (
                        <>
                          <Tooltip id="email" content={errors.email} />
                          <p className="text-sm text-red-600">{errors.email}</p>
                        </>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        data-tooltip-id="password"
                        data-tooltip-content="Please enter a password!"
                        data-tooltip-variant="error"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        value={allInputData.password}
                        onChange={onChangeInput}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {allInputData.password === "" && (
                        <Tooltip id="password" />
                      )}

                      {errors.password && (
                        <>
                          <Tooltip id="password" content={errors.password} />
                          <p className="text-sm text-red-600">
                            {errors.password}
                          </p>
                        </>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="cpassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Confirm password
                      </label>
                      <input
                        data-tooltip-id="cpassword"
                        data-tooltip-content="Please re-enter the password!"
                        data-tooltip-variant="error"
                        type="password"
                        name="cpassword"
                        id="cpassword"
                        placeholder="••••••••"
                        value={allInputData.cpassword}
                        onChange={onChangeInput}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {allInputData.cpassword === "" && (
                        <Tooltip id="cpassword" />
                      )}

                      {errors.cpassword && (
                        <>
                          <Tooltip id="cpassword" content={errors.cpassword} />
                          <p className="text-sm text-red-600">
                            {errors.cpassword}
                          </p>
                        </>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="status"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Status
                      </label>
                      <select
                        data-tooltip-id="status"
                        data-tooltip-content="Please select your status!"
                        data-tooltip-variant="error"
                        name="status"
                        id="status"
                        value={allInputData.status}
                        onChange={onChangeInput}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                      </select>
                      {allInputData.status === "" && <Tooltip id="status" />}

                      {errors.status && (
                        <>
                          <Tooltip id="status" content={errors.status} />
                          <p className="text-sm text-red-600">
                            {errors.status}
                          </p>
                        </>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Create an Account
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?{" "}
                      <a
                        href="#"
                        className="font-medium underline text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Login here
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Register;
