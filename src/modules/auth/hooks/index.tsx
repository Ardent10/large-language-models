import { useAuth, useFirestore } from "@/lib/firebase";
import { TextToSpeech } from "@/modules/common/greetings";
import { useAppState } from "@/store";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  uid: string;
  email: string | null;
}

interface signupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  occupation: string;
  user_type: string;
}

export function useAuthentication() {
  const db = useFirestore();
  const [state, dispatch] = useAppState();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        try {
          const userDoc = doc(db, "users", authUser.uid);
          const userDocSnapshot = await getDoc(userDoc); // Await the result

          if (userDocSnapshot.exists()) {
            // User document exists, set user profile data on the state
            const userData = { id: userDoc.id, ...userDocSnapshot.data() };
            dispatch({
              type: "setUserProfile",
              payload: userData,
            });
          } else {
            dispatch({ type: "logout", payload: {} });
          }
        } catch (error) {
          const currentError = error as Error;
          setError(currentError.message);
        }
      }
    });

    return () => unsubscribe();
  }, [auth]);

  async function login(email: string, password: string) {
    try {
      dispatch({
        type: "setIsLoading",
        payload: { isLoading: true },
      });
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user) {
        const currentUserDoc = doc(db, "users", res.user.uid);
        const currentUserDocSnapshot = await getDoc(currentUserDoc);

        if (currentUserDocSnapshot.exists()) {
          // User document exists, set user profile data on the state
          const userData = currentUserDocSnapshot.data();
          dispatch({
            type: "setUserProfile",
            payload: userData,
          });

          // Trigger welcome message
          TextToSpeech({ text: userData?.firstName });

          setError(null);
          dispatch({
            type: "setToggleSnackbar",
            payload: {
              open: true,
              severity: "success",
              message: "Login Successful",
            },
          });
          navigate("/");
        }
      }
    } catch (error) {
      const currentError = error as Error;
      const errorMessage = currentError.message;
      setError(errorMessage);
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: errorMessage,
        },
      });
    } finally {
      dispatch({
        type: "setIsLoading",
        payload: { isLoading: false },
      });
    }
  }

  async function googleLogin() {
    try {
      dispatch({
        type: "setIsLoading",
        payload: { isLoading: true },
      });
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      if (res.user) {
        // Check if user document already exists
        const userDoc = doc(db, "users", res.user.uid);
        const userDocSnapshot = await getDoc(userDoc);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          dispatch({ type: "setUserProfile", payload: userData });
          setError(null);
          dispatch({
            type: "setToggleSnackbar",
            payload: {
              open: true,
              severity: "success",
              message: "Login Successful",
            },
          });
        } else {
          const userData = {
            uid: res.user.uid,
            email: res.user.email,
            timestamp: serverTimestamp(),
          };

          dispatch({ type: "setUserProfile", payload: userData });
          setError(null);
          dispatch({
            type: "setToggleSnackbar",
            payload: {
              open: true,
              severity: "success",
              message: "Account Created Successfully",
            },
          });
          navigate("/");
        }
      }
    } catch (error) {
      const currentError = error as Error;
      const errorMessage = currentError.message;
      setError(errorMessage);
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: errorMessage,
        },
      });
    } finally {
      dispatch({
        type: "setIsLoading",
        payload: { isLoading: false },
      });
    }
  }
  async function signup({
    email,
    password,
    firstName,
    lastName,
    occupation,
    user_type,
  }: signupData) {
    try {
      dispatch({
        type: "setIsLoading",
        payload: { isLoading: true },
      });
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDoc);
        if (!userDocSnapshot.exists()) {
          await setDoc(userDoc, {
            email,
            firstName,
            lastName,
            occupation,
            user_type,
            timestamp: serverTimestamp(),
          });
          const userData = {
            uid: user.uid,
            email,
            firstName,
            lastName,
            occupation,
            timestamp: serverTimestamp(),
          };
          // Trigger welcome message
          TextToSpeech({ text: userData?.firstName });
          dispatch({ type: "setUserProfile", payload: userData });
          dispatch({
            type: "setToggleSnackbar",
            payload: {
              open: true,
              severity: "success",
              message: "Account Created Successfully",
            },
          });
          navigate("/");
        } else {
          dispatch({
            type: "setToggleSnackbar",
            payload: {
              open: true,
              severity: "error",
              message: "Account Creation Failed, Try again.",
            },
          });
        }
      }
    } catch (error) {
      const currentError = error as Error;
      const errorMessage = currentError.message;
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: "Account Creation Failed" + errorMessage,
        },
      });
    } finally {
      dispatch({
        type: "setIsLoading",
        payload: { isLoading: false },
      });
    }
  }

  const logout = () => {
    signOut(auth).then(() => {
      dispatch({ type: "logout", payload: {} });
      setError(null);
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "success",
          message: "Logout Successful",
        },
      });
      navigate("/login");
    });
  };

  return { error, login, signup, logout, googleLogin };
}
