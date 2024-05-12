import axios from "axios";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateField = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const assignment = location?.state;
    const { _id, title, description, marks, thumbnail_img, level, deadline } = assignment;
    const date = new Date(deadline);


    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };
    const assignmentDete = date.toLocaleDateString('en-US', options);
    console.log(assignmentDete)

    const [selectedDate, setSelectedDate] = useState(assignmentDete);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the value from the field
        const form = new FormData(e.currentTarget);
        const title = form.get('title');
        const description = form.get('description');
        const marks = form.get('marks');
        const thumbnail_img = form.get('thumbnail_img');
        const level = form.get('level');
        const deadline = selectedDate;

        // Make object for updated data
        const updatedData = { title, description, marks, thumbnail_img, level, deadline };

        // Send updated data to the back-end
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_URL}/assignments/${_id}`, updatedData)
            console.log(data);
            if (data?.modifiedCount > 0) {
                toast.success('You have updated assignment successfully');
                navigate('/assignments')
            }
        }
        catch (error) {
            throw new Error(error);
        }
    };

    return (
        <div>
            <div className="max-w-lg lg:ms-auto mx-auto text-center ">
                <div className="py-12 px-7 rounded-md bg-white">
                    <h1 className="mb-8 text-3xl font-semibold">Update the assignment</h1>
                    <form onSubmit={handleSubmit} className="" action="" method="POST">
                        <div className="space-y-6">
                            {/* Title */}
                            <div className="">
                                <label htmlFor="title" className="float-left block  font-normal text-gray-400 text-lg">Update a title of the assignment</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    defaultValue={title}
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"

                                />
                            </div>

                            {/* Description */}
                            <div className="">
                                <label htmlFor="description" className="float-left block  font-normal text-gray-400 text-lg">Update the description</label>
                                <textarea
                                    name="description"
                                    rows="5"
                                    cols=""
                                    defaultValue={description}
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"

                                ></textarea>
                            </div>

                            {/* Marks */}
                            <div className="">
                                <label htmlFor="marks" className="float-left block  font-normal text-gray-400 text-lg">Update the marks of assignment</label>
                                <input
                                    type="text"
                                    id="marks"
                                    name="marks"
                                    defaultValue={marks}
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"

                                />
                            </div>

                            {/* Thumbnail image url */}
                            <div className="">
                                <label htmlFor="thumbnail_img" className="float-left block  font-normal text-gray-400 text-lg">Update the thumbnail image url</label>
                                <input
                                    type="text"
                                    id="thumbnail_img"
                                    name="thumbnail_img"
                                    defaultValue={thumbnail_img}
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"

                                />
                            </div>

                            {/* Assignment difficulty level */}
                            <div className="">
                                <label htmlFor="level" className="float-left block  font-normal text-gray-400 text-lg">Update the selection of difficulty level</label>
                                <select
                                    id="level"
                                    name="level"
                                    className="w-full px-3 border border-gray-300 rounded-md py-2  focus:outline-none focus:border-blue-700"
                                    defaultValue={level}
                                >
                                    <option value="" disabled selected>Select a difficulty level</option>
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>

                            {/* Date picker */}
                            <div className="w-full">
                                <h5 className="text-start float-left block  font-normal text-gray-400 text-lg">Update the deadline for the assignment</h5>
                                <div className="text-start">
                                    <ReactDatePicker
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
                                <input type="submit" value={'Update the assignment'} className="py-3 text-base font-medium rounded text-white bg-blue-500 w-full hover:bg-blue-700 transition duration-300" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateField;