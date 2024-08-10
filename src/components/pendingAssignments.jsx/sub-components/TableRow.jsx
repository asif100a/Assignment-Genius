import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import './tableRow.css';

const TableRow = ({ assignment }) => {
    const { user } = useAuth();
    console.log(user);
    const navigate = useNavigate();

    const { doc_link, note, examinee, title, marks, status } = assignment;

    console.log(doc_link, note)

    const handleGivingMark = () => {
        if (examinee?.email === user?.email) {
            return (
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "You are not able to give your mark",
                })
            );

        }
        navigate(`/giving_mark`)
    };

    return (
        <tr>
            <td className="px-4 py-4 text-sm font-medium text-color whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">

                    <div className="flex items-center gap-x-2">
                        <img className="object-cover w-10 h-10 rounded-full" src={examinee?.photoURL} alt="image" />
                        <div className='font-pt-serif'>
                            <h2 className="font-medium text-color">{examinee?.displayName}</h2>
                            <p className="text-sm font-normal text-color">{examinee?.email}</p>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-12 py-4 text-sm font-medium text-color whitespace-nowrap">
                <h4 className='font-pt-serif'>{title}</h4>
            </td>
            <td className="px-4 py-4 text-sm text-color whitespace-nowrap">
                <p className='font-pt-serif'>{marks}</p>
            </td>
            <td className="px-4 py-4 text-sm text-color whitespace-nowrap">
                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-blue-100 dark:bg-gray-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>

                    <h2 className="text-sm font-normal font-pt-serif text-blue-500">{status}</h2>
                </div>
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <Link onClick={handleGivingMark} state={assignment} className='btn bg-inherit btn-border ease-in-out transition duration-300 input-btn text-color shadow-none hover:shadow-none font-pt-serif'>Give mark</Link>
            </td>
        </tr>
    );
};

TableRow.propTypes = {
    assignment: PropTypes.object
};

export default TableRow;