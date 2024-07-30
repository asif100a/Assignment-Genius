import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
    const { signInUser, googleSignIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location)

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = (data) => {
        const { email, password } = data;

        // Register user in the firebase
        signInUser(email, password)
            .then(credential => {
                if (credential.user) {
                    reset();
                    toast.success('You have signed in successfully');
                }
                if (location?.state) {
                    navigate(location?.state);
                }
                else {
                    navigate('/');
                }
            })
            .catch(err => {
                console.error(err.message);
                if (err.message === "Firebase: Error (auth/invalid-credential).") {
                    return toast.error('Invalid email or password');
                }
            });
    }

    // Google sign in
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(credential => {
                if (credential.user) toast.success('You have signed in successfully');
                if (location?.state) {
                    navigate(location?.state);
                }
                else {
                    navigate('/');
                }
            })
            .catch(err => {
                console.error(err.message);
            });
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container flex flex-col items-center h-auto px-6 mx-auto">
                <div className="">
                    <h4 className="w-full pb-4 font-medium text-center text-gray-800 capitalize dark:text-white text-2xl md:text-3xl lg:text-4xl">
                        Login now
                    </h4>
                </div>

                <div className="w-full md:w-[448px] box-border p-6 rounded-2xl mt-8">
                    <div onClick={handleGoogleSignIn} className="flex items-center justify-center w-full mt-4 text-gray-600 transition-colors duration-300 transform border-2 border-gray-600 rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer">
                        <div className="px-3 py-2">
                            <svg className="w-6 h-6" viewBox="0 0 40 40">
                                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                            </svg>
                        </div>

                        <span className="px-4 py-3 font-bold font-pt-serif text-center">Sign in with Google</span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                        <p className="text-xs text-center text-gray-500 font-pt-serif uppercase dark:text-gray-400">or login with email</p>

                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full mt-6">
                            <div className="relative flex items-center">
                                <span className="absolute top-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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

                        <div className="w-full mt-6">
                            <div className="relative flex items-center">
                                <span className="absolute top-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
                        </div>

                        <div className="mt-6">
                        <input type="submit" value={'Sign in'} className="w-full px-6 py-3 tracking-wide text-gray-700 font-bold capitalize font-pt-serif ease-in-out transition-colors duration-300 transform hover:bg-gray-600 hover:text-white btn-border hover:cursor-pointer" />
                        </div>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-sm text-center font-pt-serif text-gray-500 dark:text-gray-400"><span>Do not have an account?</span> <Link to={'/register'} className="text-blue-600 hover:underline">Register now</Link></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;