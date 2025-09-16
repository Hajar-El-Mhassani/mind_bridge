"use client";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "INIT_COMPLETE":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token && user) {
          const parsedUser = JSON.parse(user);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              token,
              user: parsedUser,
            },
          });
        } else {
          dispatch({ type: "INIT_COMPLETE" });
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        dispatch({ type: "INIT_COMPLETE" });
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: error.message,
      });
      return { success: false, error: error.message };
    }
  }, []);

  const register = useCallback(
    async (name, email, password, dateOfBirth, image) => {
      dispatch({ type: "LOGIN_START" });

      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if (dateOfBirth) {
          formData.append("date_of_birth", dateOfBirth);
        }
        if (image) {
          formData.append("image", image);
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Registration failed");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: data,
        });

        return { success: true };
      } catch (error) {
        dispatch({
          type: "LOGIN_ERROR",
          payload: error.message,
        });
        return { success: false, error: error.message };
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
