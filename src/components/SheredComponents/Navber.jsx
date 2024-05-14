import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png'
import useAuth from "../../Hooks/useAuth";
import userDefault from '../../assets/userDefault.png'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiMenu } from "react-icons/fi";

const Navber = () => {
    const { user, signOutUser } = useAuth();
    // const [userImg, setUserImg] = useState(userDefault);
    console.log(user)

    const navLinks = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/create_assignment'}>Create assignemnt</NavLink></li>
        <li><NavLink to={'/assignments'}>Assignments</NavLink></li>
        <li><NavLink to={'/pending_assignments'}>Pending assignments</NavLink></li>
        {/*  */}
    </>;

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                toast.success('You have signed out successfully');
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className="navbar bg-base-100 border">
            <div className="md:navbar-start flex-row-reverse md:flex-row w-full justify-between">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <FiMenu className="w-6 h-6" />
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 right-0">
                        {navLinks}

                        {
                            user ?
                                <>
                                    <li><NavLink to={'/my_submitted_assignments'}>My submition</NavLink></li>
                                    <li onClick={handleSignOut}><a>Sign out</a></li>
                                </>
                                :
                                <>
                                    <li><NavLink to={'/register'}>Register</NavLink></li>
                                    <li><NavLink to={'/sign_in'}>Sign in</NavLink></li>
                                </>
                        }
                    </ul>
                </div>
                <Link className="text-3xl flex gap-2 justify-center items-center">
                    <img src={logo} alt="Logo" className="w-16 h-20" />
                    <span>Assignment Genius</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end mr-2 hidden md:flex">

                {
                    user && <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" title={user?.displayName} className="btn btn-ghost btn-circle avatar">
                            <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                {
                                    user?.photoURL &&
                                    <img src={user?.photoURL} alt="User image" /> ||
                                    <img src={userDefault} alt="User image" />
                                }
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-2">
                            <li><Link to={'/my_submitted_assignments'}>My submition</Link></li>
                            <li onClick={handleSignOut}><a>Sign out</a></li>
                        </ul>
                    </div> ||
                    <div className="mr-2 space-x-4">
                        <Link to={'/register'} className="btn">Register</Link>
                        <Link to={'/sign_in'} className="btn">Sign in</Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navber;