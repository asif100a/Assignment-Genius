import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CirclesWithBar } from "react-loader-spinner";
import FeatureImg from '../../../assets/features-icon.jpg';

const Features = () => {

    const { data: featurs, isPending, isError, error } = useQuery({
        queryKey: ['features'],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_URL}/features`);
            return res.json();
        }
    });
    console.log(featurs)

    if (isPending) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <CirclesWithBar
                    height="100"
                    width="100"
                    color="#4fa94d"
                    outerCircleColor="#4fa94d"
                    innerCircleColor="#4fa94d"
                    barColor="#4fa94d"
                    ariaLabel="circles-with-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }
    if (isError) {
        return (
            toast.error(error.message)
        );
    }

    return (

        <section className="bg-gradient-to-r from-purple-900 to-indigo-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-white sm:text-5xl w-full md:w-[38rem] mx-auto">
                        The main features of our Assignment Genius
                    </h2>
                    <p className="mt-4 text-xl text-purple-200">
                        Unlock the power of decentralized finance with our cutting-edge solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    {
                        featurs.map(feature => (
                            <div key={feature._id} className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 m-4">
                                    <span className="inline-flex items-center px-1 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                        <img src={FeatureImg} alt="" className="w-7 h-7" />
                                    </span>
                                </div>
                                <div className="mb-8">
                                    <h3 className="text-2xl font-semibold text-white">{feature?.feature}</h3>
                                    <p className="mt-4 text-purple-200">{feature?.description}</p>
                                </div>
                                <div className="mb-8">
                                    <img src={feature?.img} alt="Feature photo" className="rounded-md w-[328px] h-[154px]" />
                                </div>
                                <ul className="mb-8 space-y-4 text-purple-200">
                                    {
                                        feature?.benefits.map((benefit, id) => (
                                            <li key={id} className="flex items-center">
                                                <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{benefit}</span>
                                            </li>
                                        ))
                                    }
                                </ul>

                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Features;