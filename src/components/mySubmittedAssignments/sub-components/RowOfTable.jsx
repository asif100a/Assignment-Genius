import PropTypes from 'prop-types';
import useAuth from '../../../Hooks/useAuth';

const RowOfTable = ({ assignment }) => {
    const {user} = useAuth();
    
    const { examinee, title, marks, status, obtained_mark, feedback } = assignment;
    console.log(examinee?.displayName)
    return (
        <tr>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">

                    <div className="flex items-center gap-x-2">
                        <img className="object-cover w-10 h-10 rounded-full" src={examinee?.photoURL} alt="image" />
                        <div>
                            <h2 className="font-medium font-pt-serif text-gray-800 dark:text-white">{examinee?.displayName}</h2>
                            <p className="text-sm font-normal font-pt-serif text-gray-600 dark:text-gray-400">{examinee?.email}</p>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <h4 className='font-pt-serif'>{title}</h4>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${status === 'pending' && 'bg-blue-100'} ${status === 'completed' && 'bg-green-100'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${status === 'pending' && 'bg-blue-500'} ${status === 'completed' && 'bg-green-600'}`}></span>

                    <h2 className={`text-sm font-normal font-pt-serif ${status === 'pending' && 'text-blue-500'} ${status === 'completed' && 'text-green-600'}`}>{status}</h2>
                </div>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                <p className='font-pt-serif'>{marks}</p>
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <p className='font-pt-serif'>{obtained_mark ? obtained_mark : ''}</p>
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <p className='font-pt-serif'>{feedback ? feedback : ''}</p>
            </td>
        </tr>
    );
};

RowOfTable.propTypes = {
    assignment: PropTypes.object
};

export default RowOfTable;