import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import RowOfTable from "./sub-components/RowOfTable";
import { CirclesWithBar } from "react-loader-spinner";

const MySubmittedAssignments = () => {
    const {user} = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        axios(`${import.meta.env.VITE_URL}/my_submitted_assignments/${user?.email}`, {withCredentials: true})
            .then(res => {
                setAssignments(res?.data);
                setIsLoading(false);
            })
    }, [user?.email]);

    // if data is loading
    if (isLoading) {
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

    return (
        <section className="container px-4 mx-auto mt-6">
        <div className="">
            <h2 className="text-3xl text-center font-medium text-gray-800 dark:text-white">My submitted assignments</h2>
        </div>

        <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-x-3">
                                            <span>Name</span>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <span>Assignment title</span>
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                       <span>Status</span>
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <span>Assignment marks</span>
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                       <span>Obtained marks</span>
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                       <span>Feedback</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                {
                                    assignments?.map(assignment => <RowOfTable
                                        key={assignment._id}
                                        assignment={assignment}
                                    />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default MySubmittedAssignments;