// src/pages/Auth/Auth.tsx
import { useEffect, useState } from "react";
import { Mail, Phone, Lock, Eye, EyeOff, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Auth.scss";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearError,
  fetchProfile,
  loginUser,
  registerUser,
} from "../../store/slices/authSlice";
import NotificationService from "../../Services/NotificationService";
import store from "../../store/store";

interface FormData {
  identifier: string;
  password: string;
  confirmPassword?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
}

const Auth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from);
    }
  }, [isAuthenticated, navigate, location]);

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    dispatch(clearError());
  }, [isLogin, dispatch]);

  const [identifierType, setIdentifierType] = useState<"email" | "phone">(
    "email"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    identifier: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    first_name: "",
    last_name: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.identifier) {
      newErrors.identifier = `Please enter your ${identifierType}`;
    } else if (
      identifierType === "email" &&
      !/\S+@\S+\.\S+/.test(formData.identifier)
    ) {
      newErrors.identifier = "Please enter a valid email";
    } else if (
      identifierType === "phone" &&
      !/^\d{10}$/.test(formData.identifier)
    ) {
      newErrors.identifier = "Please enter a valid 10-digit phone number";
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!isLogin) {
      if (!formData.phone_number) {
        newErrors.phone_number = "Please enter your phone number";
      } else if (!/^\d{10}$/.test(formData.phone_number)) {
        newErrors.phone_number = "Please enter a valid 10-digit phone number";
      }

      if (!formData.first_name) {
        newErrors.first_name = "Please enter your first name";
      }

      if (!formData.last_name) {
        newErrors.last_name = "Please enter your last name";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        dispatch(
          loginUser({
            identifier: formData.identifier,
            password: formData.password,
          })
        )
          .unwrap()
          .then(async () => {
            navigate("/");
            await dispatch(fetchProfile());
            const currentUser = store.getState().auth.user.first_name;
            NotificationService.success(
                `Hi ${currentUser || 'there'} you are logged in successfully! Enjoy Shopping ❤️`
            );
        }).catch((e) => {
          NotificationService.error(
            `Error ${e}`
          );
        });
      } else {
        const { confirmPassword, identifier, ...registrationData } = formData;
        dispatch(
          registerUser({
            email: identifier,
            phone_number: registrationData.phone_number || "",
            first_name: registrationData.first_name || "",
            last_name: registrationData.last_name || "",
            password: registrationData.password,
            confirmPassword,
          })
        )
          .unwrap()
          .then(() => {navigate("/")
            NotificationService.success(
              `Hi you are registered successfully. Please login now. ✌️`
            );
          })
          .catch((e) => {
            NotificationService.error(
              `Error ${e}`
            );
          });
      }
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__content">
          <h1 className="auth__title">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="auth__subtitle">
            {isLogin
              ? "Sign in to access your account"
              : "Join us to explore our handloom collections"}
          </p>

          <div className="auth__toggle-buttons">
            <button
              className={`auth__identifier-btn ${
                identifierType === "email" ? "auth__identifier-btn--active" : ""
              }`}
              onClick={() => setIdentifierType("email")}
              type="button"
            >
              <Mail size={20} />
              Email
            </button>
            <button
              className={`auth__identifier-btn ${
                identifierType === "phone" ? "auth__identifier-btn--active" : ""
              }`}
              onClick={() => setIdentifierType("phone")}
              type="button"
            >
              <Phone size={20} />
              Phone
            </button>
          </div>

          <form className="auth__form" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="auth__form-group">
                  <label htmlFor="first_name" className="auth__label">
                    First Name
                  </label>
                  <div className="auth__input-wrapper">
                    <User size={20} />
                    <input
                      type="text"
                      id="first_name"
                      className="auth__input"
                      placeholder="Enter your first name"
                      value={formData.first_name}
                      onChange={(e) =>
                        setFormData({ ...formData, first_name: e.target.value })
                      }
                    />
                  </div>
                  {errors.first_name && (
                    <span className="auth__error">{errors.first_name}</span>
                  )}
                </div>

                <div className="auth__form-group">
                  <label htmlFor="last_name" className="auth__label">
                    Last Name
                  </label>
                  <div className="auth__input-wrapper">
                    <User size={20} />
                    <input
                      type="text"
                      id="last_name"
                      className="auth__input"
                      placeholder="Enter your last name"
                      value={formData.last_name}
                      onChange={(e) =>
                        setFormData({ ...formData, last_name: e.target.value })
                      }
                    />
                  </div>
                  {errors.last_name && (
                    <span className="auth__error">{errors.last_name}</span>
                  )}
                </div>

                <div className="auth__form-group">
                  <label htmlFor="phone_number" className="auth__label">
                    Phone Number
                  </label>
                  <div className="auth__input-wrapper">
                    <Phone size={20} />
                    <input
                      type="tel"
                      id="phone_number"
                      className="auth__input"
                      placeholder="Enter your phone number"
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone_number: e.target.value,
                        })
                      }
                    />
                  </div>
                  {errors.phone_number && (
                    <span className="auth__error">{errors.phone_number}</span>
                  )}
                </div>
              </>
            )}
            <div className="auth__form-group">
              <label htmlFor="identifier" className="auth__label">
                {identifierType === "email" ? "Email" : "Phone Number"}
              </label>
              <div className="auth__input-wrapper">
                {identifierType === "email" ? (
                  <Mail size={20} />
                ) : (
                  <Phone size={20} />
                )}
                <input
                  type={identifierType === "email" ? "email" : "tel"}
                  id="identifier"
                  className="auth__input"
                  placeholder={
                    identifierType === "email"
                      ? "Enter your email"
                      : "Enter your phone number"
                  }
                  value={formData.identifier}
                  onChange={(e) =>
                    setFormData({ ...formData, identifier: e.target.value })
                  }
                />
              </div>
              {errors.identifier && (
                <span className="auth__error">{errors.identifier}</span>
              )}
            </div>

            <div className="auth__form-group">
              <label htmlFor="password" className="auth__label">
                Password
              </label>
              <div className="auth__input-wrapper">
                <Lock size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="auth__input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="auth__password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <span className="auth__error">{errors.password}</span>
              )}
            </div>

            {!isLogin && (
              <div className="auth__form-group">
                <label htmlFor="confirmPassword" className="auth__label">
                  Confirm Password
                </label>
                <div className="auth__input-wrapper">
                  <Lock size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="auth__input"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="auth__error">{errors.confirmPassword}</span>
                )}
              </div>
            )}

            {isLogin && (
              <a href="/forgot-password" className="auth__forgot-password">
                Forgot password?
              </a>
            )}

            <button type="submit" className="auth__submit-btn">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="auth__switch-mode">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="auth__switch-btn"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setFormData({
                  identifier: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
