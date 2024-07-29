import axios from "axios";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import "./updateField.css";

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
        <section className="w-full h-full text-center bg-gray-50 py-12 pb-16">
            <div>
                <h1 className="mb-8 text-2xl md:text-3xl lg:text-4xl font-semibold font-noto-serif capitalize">Update the assignment</h1>
            </div>

            <div className="py-6 px-6 rounded-md bg-white bg-opacity-15 form-border max-w-3xl lg:ms-auto mx-3 md:mx-6 lg:mx-auto">
                <form onSubmit={handleSubmit} className="block space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6" action="" method="POST">
                    {/* Title */}
                    <div className="col-span-2">
                        <label htmlFor="title" className="float-left text-start block font-pt-serif font-normal text-gray-700 text-lg">Update a title of the assignment</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={title}
                            className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 bg-inherit font-pt-serif"
                        />
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label htmlFor="description" className="float-left text-start block font-pt-serif font-normal text-gray-700 text-lg">Update the description</label>
                        <textarea
                            name="description"
                            rows="5"
                            cols=""
                            defaultValue={description}
                            className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 bg-inherit font-pt-serif"
                        ></textarea>
                    </div>

                    {/* Marks */}
                    <div className="">
                        <label htmlFor="marks" className="float-left text-start block font-pt-serif font-normal text-gray-700 text-lg">Update the marks of assignment</label>
                        <input
                            type="text"
                            id="marks"
                            name="marks"
                            defaultValue={marks}
                            className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 bg-inherit font-pt-serif"
                        />
                    </div>

                    {/* Thumbnail image url */}
                    <div className="">
                        <label htmlFor="thumbnail_img" className="float-left text-start block font-pt-serif font-normal text-gray-700 text-lg">Update the thumbnail image url</label>
                        <input
                            type="text"
                            id="thumbnail_img"
                            name="thumbnail_img"
                            defaultValue={thumbnail_img}
                            className="w-full border border-gray-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 bg-inherit font-pt-serif"
                        />
                    </div>

                    {/* Assignment difficulty level */}
                    <div className="">
                        <label htmlFor="level" className="float-left text-start block font-pt-serif font-normal text-gray-700 text-lg">Update the selection of difficulty level</label>
                        <select
                            id="level"
                            name="level"
                            className="w-full px-3 border border-gray-500 rounded-md py-2  focus:outline-none focus:border-blue-700 bg-inherit font-pt-serif"
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
                        <label className="float-left text-start block font-pt-serif font-normal text-gray-700 text-lg">Update the deadline for the assignment</label>
                        <div className="text-start">
                            <ReactDatePicker
                                selected={selectedDate}
                                // onSelect={} //when day is clicked
                                onChange={date => setSelectedDate(date)} //only when value has changed
                                dateFormat={'dd/MM/yyyy'}
                                minDate={new Date()}
                                showYearDropdown
                                scrollableMonthYearDropdown
                                className="px-3 border border-gray-500 rounded-md py-2 focus:outline-none focus:border-blue-700 border-width bg-inherit font-pt-serif"
                            />
                        </div>
                    </div>

                    <div className="col-span-2">
                        <input type="submit" value={'Update the assignment'} className="py-3 text-base font-medium rounded text-gray-700 bg-inherit btn-border w-full sm:w-1/2 hover:bg-gray-600 hover:text-white hover:cursor-pointer transition duration-500" />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateField;