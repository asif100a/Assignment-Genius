import axios from "axios";
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import { SiLevelsdotfyi } from "react-icons/si";
import { CirclesWithBar } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { LiaLevelUpAltSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const Assignments = () => {
    const { user } = useAuth();
    console.log(user)

    const [sortBy, setSortBy] = useState("");
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios(`http://localhost:5000/assignments?sortBy=${sortBy}`)
            .then(res => {
                setAssignments(res.data);
                setLoading(false)
            })
    }, [sortBy, refetch]);


    if (loading) {
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

    const handleEasySort = (sort) => {
        console.log(sort);
        setSortBy(sort);
    };
    const handleMediumSort = (sort) => {
        console.log(sort);
        setSortBy(sort);
    };
    const handleHardSort = (sort) => {
        console.log(sort);
        setSortBy(sort);
    };


    // Delete functionality
    const handleDelete = (id, email) => {
        const loggedEmail = user?.email;
        console.log(email, loggedEmail)
        // User validation before delete
        if (!loggedEmail) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please sign in before delete",
            }).then(() => {
                navigate('/sign_in');
            })
            return;
        }
        if (email !== loggedEmail) {
            return (
                Swal.fire({
                    icon: "error",
                    title: "Invalid",
                    text: "You can't delete others assignment",
                })
            );
        }

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/assignments/${id}`)
                    .then(res => {
                        const data = res?.data;
                        console.log(res.data);
                        if (data?.deletedCount > 0) {
                            swalWithBootstrapButtons.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            setRefetch(true);
                        }
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });


        console.log(id)

    };

    // Update functionality
    const handleUpdate = (id) => {
        console.log(id)
    };

    return (
        <div className="mt-6">
            <div className="flex justify-center items-center dropdown dropdown-bottom">
                <button tabIndex={0} role="button" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                    <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                    <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400 flex gap-2 justify-center items-center">
                        <span className="relative text-white">Sort by level</span>
                        <span><LiaLevelUpAltSolid className="text-white" /></span>
                    </span>
                </button>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li onClick={() => handleEasySort('Easy')}><a>Easy</a></li>
                    <li onClick={() => handleMediumSort('Medium')}><a>Medium</a></li>
                    <li onClick={() => handleHardSort('Hard')}><a>Hard</a></li>
                </ul>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mx-auto p-0 lg:p-12 lg:py-6 gap-6">
                {
                    assignments.map(assignment => (
                        <div key={assignment?._id} className="w-full max-w-md px-4 py-2 mt-6 bg-white border border-red-400 rounded-lg shadow-lg dark:bg-gray-800">
                            <div className="flex flex-col-reverse md:flex-row mt-3 md:justify-between items-center">
                                <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0 w-72">{assignment?.title}</h2>
                                <img className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src={assignment?.thumbnail_img} />
                            </div>

                            <div className="px-0 pb-4 mx-auto flex flex-col justify-start items-start">
                                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                                    <BsFileEarmarkCheckFill className="text-green-600 w-6 h-6" />

                                    <h1 className="px-2 font-bold">Marks: <span className="text-gray-500 font-medium">{assignment?.marks}</span></h1>
                                </div>

                                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                                    <SiLevelsdotfyi className="text-blue-600 w-5 h-5" />

                                    <h1 className="px-2 font-bold">Level: <span className="text-gray-500 font-medium">{assignment?.level}</span></h1>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-x-6 mt-3">
                                <button onClick={() => handleDelete(assignment?._id, assignment?.email)} className="btn btn-outline btn-sm hover:bg-red-500 hover:text-white hover:border-blue-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 text-red-500 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>

                                <button onClick={() => handleUpdate(assignment?._id)} className="btn btn-outline btn-sm hover:bg-yellow-500 hover:text-white hover:border-green-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 text-yellow-500 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex justify-center mt-4 mb-2">
                                <Link to={''} className="text-lg font-medium text-blue-600 dark:text-blue-300" tabIndex="0" role="link"><button className="btn ">View assignment</button></Link>
                            </div>
                        </div>
                    ))
                }
            </div>




            <div className="flex items-center justify-between mt-6">
                <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>

                    <span>
                        previous
                    </span>
                </a>

                <div className="items-center hidden lg:flex gap-x-3">
                    <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                    <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                    <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                    <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                    <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                    <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                    <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
                </div>

                <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <span>
                        Next
                    </span>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </a>
            </div>
        </div >
    );
};

export default Assignments;