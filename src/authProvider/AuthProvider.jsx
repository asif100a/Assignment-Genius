import { createContext, useState } from "react";
import auth from "../firebase/firebase.config";
import PropTypes from "prop-types";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext(auth);

const AuthProvider = ({ children }) => {
    // use of hooks
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Social sign in provider

    // Register with email & password
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const authInfo = {
        registerUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export default AuthProvider;