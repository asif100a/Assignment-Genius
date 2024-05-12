import {  useLoaderData, useNavigate } from "react-router-dom";
import { FaLevelUpAlt } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import useAuth from "../../../Hooks/useAuth";
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AssignmentDetails = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const textRef = useRef();
    const [error, setError] = useState("");
    const [error2, setError2] = useState("");
    

    const assignment = useLoaderData();
    const { title, description, marks, thumbnail_img, level, deadline, email } = assignment;

    const newDate = new Date(deadline);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const assignmentDeadline = newDate.toLocaleDateString('en-US', options);

    const creatorEmail = email;


    // Show the Modal
    const handleShowModal = () => {
        textRef.current.classList.remove('hidden');
    };

    // Hide the Modal
    const handleHideModal = () => {
        textRef.current.classList.add('hidden');
    };



    // Submit Modal
    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset the error
        setError("");
        setError2("");

        const form = new FormData(e.currentTarget);
        let doc_link = form.get('doc_link');
        let note = form.get('note');
        const examinee = user;
        const status = "pending";


        if (doc_link === "") {
            return setError("Please fill up this field");
        }
        else if (note === "") {
            return setError2("Please fill up this field");
        }

        console.log(examinee)
        console.log({ doc_link, note });

        // Make submitted data in object
        const submittedData = { doc_link, note, examinee, title, description, marks, thumbnail_img, level, deadline, creatorEmail, status };

        // Send submitted data to the back-end
        axios.post(`${import.meta.env.VITE_URL}/submittedAssignments`, submittedData)
            .then(res => {
                const data = res?.data;
                console.log(data);
                if (data?.insertedId) {
                    e.target.doc_link.value = "";
                    e.target.note.value = "";
                    toast.success('You have successfully submitted your assignment');
                    navigate('/my_submitted_assignments')
                }
            })

    };

    return (
        <div className="py-16 relative border border-red-600">
            <div className="mx-auto px-6 max-w-6xl text-gray-500">
                <div className="text-center">
                    <h2 className="text-3xl text-gray-950 dark:text-white font-semibold">Assignment details</h2>
                    <p className="mt-6 text-gray-700 dark:text-gray-300 w-[36rem] mx-auto">See the details about {title} and can take assignment on {title}.</p>
                </div>
                <div className="mt-12 max-w-xl mx-auto">

                    <div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                        <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-sky-500 to-white dark:from-white dark:to-white blur-2xlOpacity-25 darkOpacity-5 dark:group-hoverOpacity-10"></div>
                        <div className="relative">
                            <div className="border border-sky-500/10 flex relative *:relative *:size-12 *:m-auto size-16 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[6px] before:absolute before:inset-0 before:border-t before:border-white before:from-sky-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
                                <img src={thumbnail_img} alt="Thumbnail" className="w-12 h-12" />
                            </div>

                            <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
                                <h1 className="text-2xl font-medium mb-6">{title}</h1>
                                <p className="text-gray-700 dark:text-gray-300">{description}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex gap-2 items-center">
                                    <IoMdCheckmarkCircleOutline />
                                    <p><span className="text-base font-semibold">Marks:</span> <span>{marks}</span></p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <FaLevelUpAlt />
                                    <p><span className="text-base font-semibold">Level:</span> <span>{level}</span></p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <LuCalendarClock />
                                    <p><span className="text-base font-semibold">Deadline:</span> <span>{assignmentDeadline}</span></p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <MdOutlineMail />
                                    <p><span className="text-base font-semibold">Created by:</span> <span>{email}</span></p>
                                </div>
                            </div>
                            <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800 mt-6">

                                <button onClick={handleShowModal} className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-orange-300 rounded-lg group">
                                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                                    <span className="relative">Take assignment</span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <div ref={textRef} className="absolute w-full h-full top-0 flex justify-center items-center bg-black bg-opacity-35 hidden">
                <div className="modal-box w-[36rem]">
                    <div className="flex justify-between">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <div className="modal-action justify-start mt-0">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button onClick={handleHideModal} className="btn rounded-full btn-sm h-10 min-h-10 btn-outline text-red-600 border-red-600 hover:bg-red-500 hover:text-white hover:border-white"><RxCross1 /></button>
                            </form>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-3 mt-6">
                        <div>
                            <label htmlFor="doc_link"></label>
                            <input
                                type="text"
                                name="doc_link"
                                placeholder="Type here your PDF or doc link"
                                className="input input-bordered input-accent w-full"
                            />
                            <p className="text-red-600">{error}</p>
                        </div>

                        <div>
                            <label htmlFor="note"></label>
                            <textarea
                                name="note"
                                className="textarea textarea-info w-full h-36"
                                placeholder="Take your quick note"
                            ></textarea>
                            <p className="text-red-600">{error2}</p>
                        </div>

                        <input type="submit" value={'Submit the assignment'} className="px-3 py-2 rounded-lg font-semibold bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-black hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 hover:cursor-pointer" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssignmentDetails;