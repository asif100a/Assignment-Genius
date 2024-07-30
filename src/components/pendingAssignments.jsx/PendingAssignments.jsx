import axios from "axios";
import { useEffect, useState } from "react";
import TableRow from "./sub-components/TableRow";
import { CirclesWithBar } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import "./pendingAssignment.css";

const PendingAssignments = () => {
    const {user} = useAuth();
    const [assignments, setAssignments] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation()
    console.log(location)
    
    useEffect(() => {
        const email = user?.email;
        const assignments = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_URL}/submittedAssignments/${email}`, {withCredentials: true});
                console.log(data);
                setAssignments(data);
                setIsLoading(false);
            }
            catch (error) {
                throw new Error(error);
            }
        };

        assignments();
    }, [user?.email]);
    console.log(assignments)

    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-gray-50">
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
        <section className="container px-4 mx-auto py-12 bg-gray-50">
            <div className="">
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-semibold font-noto-serif text-gray-800 dark:text-white capitalize">The list of pending assignments</h2>
            </div>

            <div className="flex flex-col mt-8">
                <div className="-mx-4 overflow-x-auto sm:-mx-6 lg:mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border-4 border-double border-[#808080] dark:border-gray-700 rounded-lg">
                            <table className="min-w-full">
                                <thead className="bg-inherit border-b-double dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-700 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                <span className="font-noto-serif font-bold">Examinee name</span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-700 dark:text-gray-400">
                                            <span className="font-noto-serif font-bold">Assignment title</span>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-700 dark:text-gray-400">
                                            <span className="font-noto-serif font-bold">Assignment marks</span>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-700 dark:text-gray-400">
                                           <span className="font-noto-serif font-bold">Status</span>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-700 dark:text-gray-400">
                                           <span className="font-noto-serif font-bold">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-inherit divide-y-2 divide-[#808080] dark:divide-[#808080] dark:bg-gray-900">
                                    {
                                        assignments?.map(assignment => <TableRow
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

export default PendingAssignments;