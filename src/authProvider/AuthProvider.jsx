import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import PropTypes from "prop-types";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(auth);

const AuthProvider = ({ children }) => {
    // use of hooks
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Social sign in provider
    const googleProvider = new GoogleAuthProvider();

    // Register with email & password
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign in user with email & password
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Sign in with Google
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    };

    // Sign out user
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    // State change menagement
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            setUser(currentUser);
            setLoading(false);
            const loggedUser = {email: userEmail};

            // Implement the jwt access token
            if(currentUser) {
                axios.post(`${import.meta.env.VITE_URL}/jwt`, loggedUser, {withCredentials: true})
                    .then(res => {
                        const data = res?.data;
                        console.log(data);
                    })
            }
            else{
                axios.post(`${import.meta.env.VITE_URL}/sign_out`, loggedUser, {withCredentials: true})
                    .then(res => {
                        console.log(res?.data);
                    })
            }
        });

        return () => {
            unsubscribe();
        };
    }, [user?.email]);

    const authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        googleSignIn,
        signOutUser,
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