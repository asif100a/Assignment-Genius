import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TableRow = ({ assignment }) => {
    const { doc_link, note, examinee, title, description, marks, thumbnail_img, level, deadline, creatorEmail, status } = assignment;

    console.log(doc_link, note)

    return (
        <tr>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">

                    <div className="flex items-center gap-x-2">
                        <img className="object-cover w-10 h-10 rounded-full" src={thumbnail_img} alt="image" />
                        <div>
                            <h2 className="font-medium text-gray-800 dark:text-white ">{examinee?.displayName}</h2>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{examinee?.email}</p>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <h4>{title}</h4>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                <p>{marks}</p>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-blue-100 dark:bg-gray-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>

                    <h2 className="text-sm font-normal text-blue-500">{status}</h2>
                </div>
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <Link to={`/giving_mark`} state={assignment} className='btn'>Give mark</Link>
            </td>
        </tr>
    );
};

TableRow.propTypes = {
    assignment: PropTypes.object
};

export default TableRow;