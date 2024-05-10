import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Register = () => {
    const { registerUser } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const { name, photo_url, email, password, confirm_password } = data;

        // Register user in the firebase
        registerUser(email, password)
            .then(credential => {
                if (credential.user) toast.success('You have registered successfully');
            })
            .catch(err => {
                console.error(err.message);
                if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                    return toast.error('You have already registered');
                }
            });
    }


    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container flex items-center justify-center h-auto px-6 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
                    <div className="flex justify-center mx-auto">
                        <img className="w-16 h-20" src={logo} alt="Logo" />
                    </div>

                    <div className="flex items-center justify-center mt-6">
                        <h4 className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white text-2xl">
                            Register
                        </h4>
                    </div>

                    <div className="relative flex items-center mt-8">
                        <span className="absolute top-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>

                        <div>
                            <input
                                type="text"
                                name="name"
                                className="block w-[28rem] py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Name"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="text-red-600">This field is required</span>}
                        </div>

                    </div>
                    <div className="relative flex items-center mt-8">
                        <span className="absolute top-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </span>

                        <div>
                            <input
                                type="text"
                                name="photo_url"
                                className="block w-[28rem] py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Photo url"
                                {...register("photo_url", { required: true })}
                            />
                            {errors.photo_url && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>

                    <div className="relative flex items-center mt-6">
                        <span className="absolute top-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>

                        <div>
                            <input
                                type="email"
                                name="email"
                                className="block w-[28rem] py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Email address"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute top-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <div>
                            <input
                                type="password"
                                name="password"
                                className="block w-[28rem] px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Password"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute top-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <div>
                            <input
                                type="password"
                                name="confirm_password"
                                className="block w-[28rem] px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Confirm Password"
                                {...register("confirm_password", { required: true })}
                            />
                            {errors.confirm_password && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>

                    <div className="mt-6">
                        <input type="submit" value={'Sign Up'} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" />

                        <div className="mt-6 text-center ">
                            <div className="text-sm">
                                <span>Already have an account?</span> <Link to={'/sign_in'} className="text-blue-600 hover:underline">Sign in now</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Register;