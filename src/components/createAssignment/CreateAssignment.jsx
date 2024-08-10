import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import "./createAssignment.css";

const CreateAssignment = () => {
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = (data) => {
        const { title, description, marks, thumbnail_img, level } = data;

        // Create the data
        const email = user?.email;
        const deadline = selectedDate;
        const createdAssignment = { title, description, marks, thumbnail_img, level, deadline, email };

        // Send data to the back-end
        axios.post(`${import.meta.env.VITE_URL}/assignments`, createdAssignment, { withCredentials: true })
            .then(res => {
                const data = res?.data;

                // Show a toast after successfully creation of assignment
                if (data?.insertedId) {
                    toast.success('You have successfully created an assignment');
                    reset();
                    setSelectedDate(new Date());
                }
            });
    }

    return (
        <section className="w-full h-full text-center bg-color py-12 pb-16">
            <div>
                <h1 className="mb-8 text-2xl md:text-3xl lg:text-4xl font-semibold font-noto-serif text-color capitalize">Create an assignment</h1>
            </div>

            <div className="py-6 px-6 rounded-md bg-inherit form-border max-w-3xl lg:ms-auto mx-3 md:mx-6 lg:mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="block space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6" action="" method="POST">
                    {/* Title */}
                    <div className="col-span-2">
                        <label htmlFor="title" className="float-left text-start block font-pt-serif font-normal text-color text-lg">Title of the assignment</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title of the assignment" className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 bg-inherit font-pt-serif"
                            {...register("title", { required: true })}
                        />
                        {errors.title && <p className="text-red-600 w-full text-start w-full text-start">This field is required</p>}
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label htmlFor="description" className="float-left text-start block font-pt-serif font-normal text-color text-lg">Description of the assignment</label>
                        <textarea
                            name="description"
                            rows="5"
                            cols=""
                            placeholder="Description of the assignment..."
                            className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 bg-inherit font-pt-serif"
                            {...register("description", { required: true })}
                        ></textarea>
                        {errors.description && <p className="text-red-600 w-full text-start">This field is required</p>}
                    </div>

                    {/* Marks */}
                    <div className="">
                        <label htmlFor="marks" className="float-left text-start block font-pt-serif font-normal text-color text-lg">Marks of the assignment</label>
                        <input
                            type="text"
                            id="marks"
                            name="marks"
                            placeholder="Marks of the assignment" className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 bg-inherit font-pt-serif"
                            {...register("marks", { required: true })}
                        />
                        {errors.marks && <p className="text-red-600 w-full text-start">This field is required</p>}
                    </div>

                    {/* Thumbnail image url */}
                    <div className="">
                        <label htmlFor="thumbnail_img" className="float-left text-start block font-pt-serif font-normal text-color text-lg">Thumbnail image url</label>
                        <input
                            type="text"
                            id="thumbnail_img"
                            name="thumbnail_img"
                            placeholder="Thumbnail image url"
                            className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 bg-inherit font-pt-serif"
                            {...register("thumbnail_img", { required: true })}
                        />
                        {errors.thumbnail_img && <p className="text-red-600 w-full text-start">This field is required</p>}
                    </div>

                    {/* Assignment difficulty level */}
                    <div className="">
                        <label htmlFor="level" className="float-left text-start block font-pt-serif font-normal text-color text-lg">Difficulty level for the assignment</label>
                        <select
                            id="level"
                            name="level"
                            className="w-full px-3 border border-gray-500 rounded-md py-2  focus:outline-none focus:border-blue-700 bg-inherit font-pt-serif"
                            {...register("level", { required: true })}
                        >
                            <option value="" disabled selected>Select a difficulty level</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        {errors.level && <p className="text-red-600 w-full text-start">This field is required</p>}
                    </div>

                    {/* Date picker */}
                    <div className="w-full">
                        <h5 className="text-start float-left block font-pt-serif font-normal text-color text-lg">Deadline for the assignment</h5>
                        <div className="text-start">
                            <DatePicker
                                selected={selectedDate}
                                // onSelect={} //when day is clicked
                                onChange={date => setSelectedDate(date)} //only when value has changed
                                dateFormat={'dd/MM/yyyy'}
                                minDate={new Date()}
                                showYearDropdown
                                scrollableMonthYearDropdown
                                className="px-3 border border-gray-500 rounded-md py-2  focus:outline-none focus:border-blue-700 border-width bg-inherit font-pt-serif"
                            />
                        </div>
                    </div>

                    <div className="col-span-2">
                        <input type="submit" value={'Create the assignment'} className="py-3 text-base font-medium rounded text-color bg-inherit btn-border w-full sm:w-1/2 hover:bg-gray-600 hover:text-white hover:cursor-pointer transition duration-500" />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CreateAssignment;