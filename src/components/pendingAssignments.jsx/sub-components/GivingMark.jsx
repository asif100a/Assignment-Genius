import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import "./giveMark.css";

const GivingMark = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        reset 
    } = useForm();

    const { user } = useAuth();
    const location = useLocation();
    console.log(location)

    if(!location?.state) {
        return navigate('/pending_assignments');
    } else{
        // console.log(object)
    }

    const assignment = location?.state;
    const { _id, doc_link, note, examinee } = assignment;

    // Update the assignment after giving mark
        const onSubmit = (data) => {
        const { obtained_mark, feedback } = data;
        const examinerEmail = user?.email;

        // Examiner validation
        if (examinee?.email === examinerEmail) {
            return (
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "You are not able to give your mark",
                })
            );
        }

        // Make the updated data after marking the assignment
        const markStatus = "completed";
        const updatedData = { obtained_mark, feedback, markStatus, examinerEmail };

        // Send data to the back-end
        axios.put(`${import.meta.env.VITE_URL}/submittedAssignments/${_id}`, updatedData)
            .then(res => {
                const data = res.data
                console.log(data);
                if(data?.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Successful",
                        text: "You have completed giving mark successfully",
                    }).then(() => {
                        reset();
                        navigate('/pending_assignments')
                    })
                }
            });

    }

    return (
        <div className="bg-gray-50 py-8 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-bold font-noto-serif capitalize tracking-tight text-gray-700 sm:text-5xl">Give mark page for assignment</h2>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-pt-serif leading-8 text-gray-600">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p>

                <div className="isolate mx-auto mt-10">
                    <div className="rounded-3xl p-8 xl:p-10 box-border flex-col justify-center gap-6">
                        <div className="">
                            <h3 id="tier-startup" className="text-2xl font-semibold font-noto-serif leading-8 text-gray-700">Submitted info</h3>
                            <div className="mt-6 flex flex-col gap-y-1 font-pt-serif">
                                <p className="text-base font-semibold">PDF or doc link:</p>
                                <Link className="hover:text-blue-500 text-orange-600 hover:underline whitespace-nowrap overflow-x-auto py-2 md:py-0">{doc_link}</Link>
                            </div>
                            <div className="mt-6 flex flex-col gap-y-1 font-pt-serif">
                                <p className="text-base font-semibold">Student notes: </p>
                                <p className="text-gray-500">{note}</p>
                            </div>

                        </div>

                        <hr className="my-6 border border-gray-700 border-dashed" />

                        <div>
                            <h3 id="tier-startup" className="text-2xl font-semibold font-noto-serif leading-8 text-gray-700">Mark field for the assignment</h3>

                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-w-sm rounded-xl mt-6">
                                <div>
                                    <label htmlFor="obtained_mark" className="mb-1 font-pt-serif">Mark of the assignment:</label>
                                    <input
                                        type="text"
                                        name="obtained_mark"
                                        placeholder="Mark field"
                                        className="input input-bordered bg-inherit border-2 border-gray-600 w-full focus:border-gray-600 focus:outline-double focus:outline-gray-600 font-pt-serif"
                                        {...register("obtained_mark", { required: true })}
                                    />
                                    {errors.obtained_mark && <span className="text-red-600">This field is required</span>}
                                </div>

                                <div>
                                    <label htmlFor="feedback" className="font-pt-serif">Feedback of the assignment:</label>
                                    <textarea
                                        name="feedback"
                                        className="textarea bg-inherit border-2 border-gray-600 focus:border-gray-600 focus:outline-double focus:outline-gray-600 w-full h-36 font-pt-serif"
                                        rows="3"
                                        cols="50"
                                        placeholder="Feedback field"
                                        {...register("feedback", { required: true })}
                                    ></textarea>
                                    {errors.feedback && <span className="text-red-600">This field is required</span>}
                                </div>

                                <input type="submit" value={'Submit the mark'} aria-describedby="tier-startup" className="mt-3 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 btn-border hover:cursor-pointer ease-in-out transition-all duration-300 hover:bg-gray-600 hover:text-white" />
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GivingMark;