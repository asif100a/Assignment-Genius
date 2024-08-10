import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import RowOfTable from "./sub-components/RowOfTable";
import { CirclesWithBar } from "react-loader-spinner";
import "./mySubmitted.css";

const MySubmittedAssignments = () => {
    const { user } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        axios(`${import.meta.env.VITE_URL}/my_submitted_assignments/${user?.email}`, { withCredentials: true })
            .then(res => {
                setAssignments(res?.data);
                setIsLoading(false);
            })
    }, [user?.email]);

    // if data is loading
    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-color">
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
        <section className="bg-color min-h-[calc(100vh-413.6px)]">
            <div className="container px-4 mx-auto py-12">
                <div className="">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-semibold font-noto-serif text-color capitalize">My submitted assignments</h2>
                </div>

                <div className="flex flex-col mt-8">
                    <div className="-mx-4 overflow-x-auto sm:-mx-6 lg:mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border-4 border-double border-[#808080] rounded-lg">
                                <table className="min-w-full">
                                    <thead className="bg-inherit border-b-double">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-color">
                                                <div className="flex items-center gap-x-3">
                                                    <span className="font-noto-serif font-bold">Name</span>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-color">
                                                <span className="font-noto-serif font-bold">Assignment title</span>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-color">
                                                <span className="font-noto-serif font-bold">Status</span>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-color">
                                                <span className="font-noto-serif font-bold">Assignment marks</span>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-color">
                                                <span className="font-noto-serif font-bold">Obtained marks</span>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-color">
                                                <span className="font-noto-serif font-bold">Feedback</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-inherit divide-y-2 divide-[#808080] dark:divide-[#808080] dark:bg-gray-900">
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
            </div>
        </section>
    );
};

export default MySubmittedAssignments;