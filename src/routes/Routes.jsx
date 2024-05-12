import { createBrowserRouter } from 'react-router-dom';
import Root from '../root/Root';
import ErrorPage from '../errorPage/ErrorPage';
import Home from '../components/home/Home';
import CreateAssignment from '../components/createAssignment/CreateAssignment';
import Assignments from '../components/assignments/Assignments';
import PendingAssignments from '../components/pendingAssignments.jsx/PendingAssignments';
import MySubmittedAssignments from '../components/mySubmittedAssignments/MySubmittedAssignments';
import Register from '../components/authentication/Register';
import SignIn from '../components/authentication/SignIn';
import ProtectedPage from '../protectedPage/ProtectedPage';
import UpdateField from '../components/assignments/sub-components/UpdateField';
import AssignmentDetails from '../components/assignments/sub-components/AssignmentDetails';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            }, {
                path: '/create_assignment',
                element: <ProtectedPage><CreateAssignment /></ProtectedPage>
            }, {
                path: '/assignments',
                element: <Assignments />
            }, {
                path: '/update_field',
                element: <ProtectedPage><UpdateField /></ProtectedPage>
            }, {
                path: '/assignment_details/:id',
                element: <ProtectedPage><AssignmentDetails /></ProtectedPage>,
                loader: ({params} ) => fetch(`${import.meta.env.VITE_URL}/assignment_details/${params.id}`)
            }, {
                path: '/pending_assignments',
                element: <ProtectedPage><PendingAssignments /></ProtectedPage>
            }, {
                path: '/my_submitted_assignments',
                element: <ProtectedPage><MySubmittedAssignments /></ProtectedPage>
            }, {
                path: '/register',
                element: <Register />
            }, {
                path: '/sign_in',
                element: <SignIn />
            }
        ]
    }
]);

export default router;