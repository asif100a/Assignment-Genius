import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import "./register.css";

const Register = () => {
    const { registerUser } = useAuth();
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState("");
    const [confirm_passwordError, setConfirm_passwordError] = useState("");

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = (data) => {
        const { name, photo_url, email, password, confirm_password } = data;

        // Reset the error
        setPasswordError("");
        setConfirm_passwordError("");

        // Password validation
        if (password.length < 6) {
            return setPasswordError("Please provide at least 6 character of password");
        }
        if (!/[A-Z]/.test(password)) {
            return setPasswordError("Please provide at least one character of 'uppercase'");
        }
        else if (!/[a-z]/.test(password)) {
            return setPasswordError("Please provide at least one character of 'lowercase'");
        }
        else if (confirm_password !== password) {
            return setConfirm_passwordError("Please confirm password as the same password");
        }

        // Register user in the firebase
        registerUser(email, password, name, photo_url)
            .then(credential => {
                updateProfile(credential?.user, {
                    displayName: name,
                    photoURL: photo_url,
                }).then(() => {
                    if (credential.user) toast.success('You have registered successfully');
                    reset();
                    navigate('/');
                }).catch(err => {
                    console.log(err.message);
                })
            })
            .catch(err => {
                console.error(err.message);
                if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                    return toast.error('You have already registered');
                }
            });
    }


    return (
        <section className="bg-color py-12">
            <div className="container flex flex-col items-center h-auto px-6 mx-auto">
                <div className="">
                    <h4 className="w-full pb-4 font-medium text-center text-color capitalize text-2xl md:text-3xl lg:text-4xl">
                        Register your account
                    </h4>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-[448px] box-border p-6 rounded-2xl mt-8">
                    <div className="w-full mt-8">
                        <div className="relative flex items-center">
                            <span className="absolute top-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>

                            <input
                                type="text"
                                name="name"
                                className="input input-bordered border-2 border-gray-600 bg-inherit w-full py-3 px-11 focus:border-gray-600 focus:outline-double focus:outline-gray-600 font-pt-serif"
                                placeholder="Name"
                                {...register("name", { required: true })}
                            />
                        </div>
                        {errors.name && <span className="text-red-600">This field is required</span>}
                    </div>

                    <div className="w-full mt-8">
                        <div className="relative flex items-center">
                            <span className="absolute top-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                            </span>

                            <input
                                type="text"
                                name="photo_url"
                                className="input input-bordered border-2 border-gray-600 bg-inherit w-full py-3 px-11 focus:border-gray-600 focus:outline-double focus:outline-gray-600 font-pt-serif"
                                placeholder="Photo url"
                                {...register("photo_url", { required: true })}
                            />
                        </div>
                        {errors.photo_url && <span className="text-red-600">This field is required</span>}
                    </div>

                    <div className="w-full mt-6">
                        <div className="relative flex items-center">
                            <span className="absolute top-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>

                            <input
                                type="email"
                                name="email"
                                className="input input-bordered border-2 border-gray-600 bg-inherit w-full py-3 px-11 focus:border-gray-600 focus:outline-double focus:outline-gray-600 font-pt-serif"
                                placeholder="Email address"
                                {...register("email", { required: true })}
                            />
                        </div>
                        {errors.email && <span className="text-red-600">This field is required</span>}
                    </div>

                    <div className="w-full mt-4">
                        <div className="relative flex items-center">
                            <span className="absolute top-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input
                                type="password"
                                name="password"
                                className="input input-bordered border-2 border-gray-600 bg-inherit w-full py-3 px-11 focus:border-gray-600 focus:outline-double focus:outline-gray-600 font-pt-serif"
                                placeholder="Password"
                                {...register("password", { required: true })}
                            />
                        </div>
                        {errors.password && <span className="text-red-600">This field is required</span>}
                        {passwordError && <p className="text-red-600">{passwordError}</p>}
                    </div>

                    <div className="w-full mt-4">
                        <div className="relative flex items-center">
                            <span className="absolute top-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input
                                type="password"
                                name="confirm_password"
                                className="input input-bordered border-2 border-gray-600 bg-inherit w-full py-3 px-11 focus:border-gray-600 focus:outline-double focus:outline-gray-600 font-pt-serif"
                                placeholder="Confirm Password"
                                {...register("confirm_password", { required: true })}
                            />
                        </div>
                        {errors.confirm_password && <span className="text-red-600">This field is required</span>}
                        {confirm_passwordError && <p className="text-red-600">{confirm_passwordError}</p>}
                    </div>

                    <div className="mt-6">
                        <input type="submit" value={'Sign Up'} className="w-full px-6 py-3 tracking-wide text-color font-bold capitalize font-pt-serif ease-in-out transition-colors duration-300 transform input-btn hover:text-white btn-border hover:cursor-pointer" />

                        <div className="mt-6 text-center ">
                            <div className="text-sm">
                                <span className="font-pt-serif text-gray-500">Already have an account?</span> <Link to={'/sign_in'} className="text-blue-600 hover:underline">Sign in now</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Register;