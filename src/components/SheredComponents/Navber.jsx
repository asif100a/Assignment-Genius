import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png'

const Navber = () => {
    const navLinks = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/create_assignment'}>Create assignemnt</NavLink></li>
        <li><NavLink to={'/assignments'}>Assignments</NavLink></li>
        <li><NavLink to={'/pending_assignments'}>Pending assignments</NavLink></li>
        {/* <li><NavLink to={'/my_submitted_assignments'}>My attempted assignment</NavLink></li> */}
    </>;
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link className="text-xl">
                    <img src={logo} alt="Logo" className="w-16 h-20" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="mr-10 space-x-4">
                    <Link to={'/register'} className="btn">Register</Link>
                    <Link to={'/sign_in'} className="btn">Sign in</Link>
                </div>
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navber;