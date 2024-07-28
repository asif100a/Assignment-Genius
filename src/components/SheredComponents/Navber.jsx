import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png'
import useAuth from "../../Hooks/useAuth";
import userDefault from '../../assets/userDefault.png'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiMenu } from "react-icons/fi";
import "./navber.css";

const Navber = () => {
    const { user, signOutUser } = useAuth();
    // const [userImg, setUserImg] = useState(userDefault);
    console.log(user)
    const [theme, setTheme] = useState('light');

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

    const handleToggleTheme = (e) => {
        console.log(e.target.checked);
        if(e.target.checked) {
            setTheme('night');
        }
        else{
            setTheme('light');
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localThem = localStorage.getItem('theme')

        document.querySelector('html').setAttribute('data-theme', localThem)
    }, [theme]);

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
                    <span className="text-gray-600 playwrite-au-tas">Assignment Genius</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-3 font-noto-serif">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end mr-2 hidden md:flex">
                {/* Theme toggle input */}
                <div className="mr-6">
                    <label className="flex cursor-pointer gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                        <input
                            type="checkbox"
                            name="checkbox"
                            value="synthwave"
                            className="toggle theme-controller"
                            onChange={handleToggleTheme}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </label>
                </div>

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