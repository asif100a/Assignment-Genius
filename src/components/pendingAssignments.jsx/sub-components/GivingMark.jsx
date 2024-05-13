import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";

const GivingMark = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { user } = useAuth();
    const location = useLocation();
    console.log(location)

    if(!location?.state) {
        return navigate('/pending_assignments');
    }

    const assignment = location?.state;
    const { _id, doc_link, note, examinee, title, description, marks, thumbnail_img, level, deadline, creatorEmail, status } = assignment;

    // Update the assignment after giving mark
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
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
        <div className="bg-white py-8 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-blue-500 sm:text-5xl">Give mark page for assignment</h2>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-cyan-600">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p>

                <div className="isolate mx-auto mt-10">
                    <div className="rounded-3xl p-8 ring-1 xl:p-10 ring-yellow-400 flex-col justify-center gap-6">
                        <div className="">
                            <h3 id="tier-startup" className="text-2xl font-semibold leading-8 text-blue-600">Submitted info</h3>
                            <div className="mt-6 flex flex-col gap-y-1">
                                <p className="text-base font-semibold">PDF or doc link:</p>
                                <Link className="hover:text-blue-500 text-orange-600 hover:underline">{doc_link}</Link>
                            </div>
                            <div className="mt-6 flex flex-col gap-y-1">
                                <p className="text-base font-semibold">Student notes: </p>
                                <p className="text-gray-500">{note}</p>
                            </div>

                        </div>

                        <hr className="my-6 border border-green-500 border-dashed" />

                        <div>
                            <h3 id="tier-startup" className="text-2xl font-semibold leading-8 text-orange-600">Mark field for the assignment</h3>

                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-w-sm rounded-xl mt-6">
                                <div>
                                    <label htmlFor="obtained_mark" className="mb-1">Mark of the assignment:</label>
                                    <input
                                        type="text"
                                        name="obtained_mark"
                                        placeholder="Mark field"
                                        className="w-full outline-none rounded-md py-1 px-2 bg-transparent border-1 border"
                                        {...register("obtained_mark", { required: true })}
                                    />
                                    {errors.obtained_mark && <span className="text-red-600">This field is required</span>}
                                </div>

                                <div>
                                    <label htmlFor="feedback">Feedback of the assignment:</label>
                                    <textarea
                                        name="feedback"
                                        className="text-gray-400 pl-2 pt-1 rounded-md outline-none bg-transparent border-1 border"
                                        rows="3"
                                        cols="50"
                                        placeholder="Feedback field"
                                        {...register("feedback", { required: true })}
                                    ></textarea>
                                    {errors.feedback && <span className="text-red-600">This field is required</span>}
                                </div>

                                <input type="submit" value={'Submit the mark'} aria-describedby="tier-startup" className="mt-3 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-green-600 text-white shadow-sm hover:bg-green-800 focus-visible:outline-red-600" />
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GivingMark;