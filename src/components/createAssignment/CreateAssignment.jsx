import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const CreateAssignment = () => {
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const { title, description, marks, thumbnail_img, level } = data;

        // Create the data
        const email = user?.email;
        const deadline = selectedDate;
        const createdAssignment = { title, description, marks, thumbnail_img, level, deadline, email };
        console.log(createdAssignment)

        // Send data to the back-end
        axios.post('http://localhost:5000/assignments',  createdAssignment )
            .then(res => {
                console.log(res.data);
                const data = res?.data;

                // Show a toast after successfully creation of assignment
                if(data?.insertedId) {
                    toast.success('You have successfully created an assignment');
                }
            });
    }

    return (
        <div>
            <div className="max-w-lg lg:ms-auto mx-auto text-center ">
                <div className="py-12 px-7 rounded-md bg-white">
                    <h1 className="mb-8 text-3xl font-semibold">Create an assignment</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="" action="" method="POST">
                        <div className="space-y-6">
                            {/* Title */}
                            <div className="">
                                <label htmlFor="title" className="float-left block  font-normal text-gray-400 text-lg">Write a title of the assignment</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title of the assignment" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                                    {...register("title", { required: true })}
                                />
                                {errors.title && <span className="text-red-600">This field is required</span>}
                            </div>

                            {/* Description */}
                            <div className="">
                                <label htmlFor="description" className="float-left block  font-normal text-gray-400 text-lg">Write the description</label>
                                <textarea
                                    name="description"
                                    rows="5"
                                    cols=""
                                    placeholder="Description of the assignment..."
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                                    {...register("description", { required: true })}
                                ></textarea>
                                {errors.description && <span className="text-red-600">This field is required</span>}
                            </div>

                            {/* Marks */}
                            <div className="">
                                <label htmlFor="marks" className="float-left block  font-normal text-gray-400 text-lg">Write the marks</label>
                                <input
                                    type="text"
                                    id="marks"
                                    name="marks"
                                    placeholder="Marks of the assignment" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                                    {...register("marks", { required: true })}
                                />
                                {errors.marks && <span className="text-red-600">This field is required</span>}
                            </div>

                            {/* Thumbnail image url */}
                            <div className="">
                                <label htmlFor="thumbnail_img" className="float-left block  font-normal text-gray-400 text-lg">Provide a thumbnail image url</label>
                                <input
                                    type="text"
                                    id="thumbnail_img"
                                    name="thumbnail_img"
                                    placeholder="Thumbnail image url"
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                                    {...register("thumbnail_img", { required: true })}
                                />
                                {errors.thumbnail_img && <span className="text-red-600">This field is required</span>}
                            </div>

                            {/* Assignment difficulty level */}
                            <div className="">
                                <label htmlFor="level" className="float-left block  font-normal text-gray-400 text-lg">Select difficulty level for assignment</label>
                                <select
                                    id="level"
                                    name="level"
                                    className="w-full px-3 border border-gray-300 rounded-md py-2  focus:outline-none focus:border-blue-700"
                                    {...register("level", { required: true })}
                                >
                                    <option value="" disabled selected>Select a difficulty level</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                                {errors.level && <span className="text-red-600 text-start">This field is required</span>}
                            </div>

                            {/* Date picker */}
                            <div className="w-full">
                                <h5 className="text-start float-left block  font-normal text-gray-400 text-lg">Pick a deadline for the assignment</h5>
                                <div className="text-start">
                                    <DatePicker
                                        selected={selectedDate}
                                        // onSelect={} //when day is clicked
                                        onChange={date => setSelectedDate(date)} //only when value has changed
                                        dateFormat={'dd/MM/yyyy'}
                                        minDate={new Date()}
                                        showYearDropdown
                                        scrollableMonthYearDropdown
                                        className="px-3 border border-gray-300 rounded-md py-2  focus:outline-none focus:border-blue-700 w-[456px]"
                                    />
                                </div>
                            </div>

                            <div className="">
                                <input type="submit" value={'Create the assignment'} className="py-3 text-base font-medium rounded text-white bg-blue-500 w-full hover:bg-blue-700 transition duration-300" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAssignment;