import React, { useState } from "react";
import "./RegisterPage.scss";
import { useTranslate } from "@/hooks/useTranslate";
import { useForm } from "@/hooks/useForm";
import { AuthService } from "@/services/auth/AuthService";
import { RegisterRequest } from "@/services/auth/Props/Register";
import { useNavigate } from "react-router-dom";
import { ErrorsForm, RegisterForm } from "./Props/FormProps";

export const RegisterPage = () => {
  const t = useTranslate();
  const navigate = useNavigate();
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successfullAlert, setSuccessfullAlert] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (data: RegisterForm) => {
    const errors: ErrorsForm = {};
    if (data.username.trim().length === 0) {
      errors.username = t("RegisterPage", "error.username");
    } else if (data.username.length < 3 || data.username.length > 50) {
      errors.username = t("RegisterPage", "error.username.length");
    }
    if (data.email.trim().length === 0) {
      errors.email = t("RegisterPage", "error.email.required");
    } else if (data.email.length < 3 || data.email.length > 300) {
      errors.email = t("RegisterPage", "error.email.length");
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = t("RegisterPage", "error.email.invalid");
    }
    if (data.password.trim().length === 0) {
      errors.password = t("RegisterPage", "error.password");
    } else if (data.username.length < 8 || data.username.length > 60) {
      errors.password = t("RegisterPage", "error.password.length");
    }
    if (data.repeatPassword !== data.password) {
      errors.repeatPassword = t("RegisterPage", "error.repeatPassword");
    }
    return errors;
  };

  const registerForm = useForm<RegisterForm>(
    {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validate
  );

  const authService = new AuthService();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerForm.handleSubmit(async () => {
      setIsSubmitting(true);
      const requestData: RegisterRequest = {
        username: registerForm.values.username,
        email: registerForm.values.email,
        password: registerForm.values.password,
      };

      try {
        await authService.register(requestData);
        setErrorAlert(null); // Limpia la alerta de error
        setSuccessfullAlert(true);
        setTimeout(() => {
          navigate("/login"); // Navega al login después del registro exitoso
        }, 3000);
      } catch (error) {
        console.error(error);
        setErrorAlert(t("RegisterPage", "error.registrationFailed"));
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  const handleLoginNavigation = () => {
    navigate("/login");
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              {t("RegisterPage", "title")}
            </h5>
            {/* Campo de username */}
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("RegisterPage", "username")}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={registerForm.values.username}
                onChange={(e) =>
                  registerForm.handleChange("username", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder={t("RegisterPage", "username")}
                autoComplete="off"
              />
              {!!registerForm.errors.username && (
                <p className="text-red-500 text-sm">
                  {registerForm.errors.username}
                </p>
              )}
            </div>

            {/* Campo de email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("RegisterPage", "email")}
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={registerForm.values.email}
                onChange={(e) =>
                  registerForm.handleChange("email", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder={t("RegisterPage", "email")}
                autoComplete="off"
              />
              {!!registerForm.errors.email && (
                <p className="text-red-500 text-sm">
                  {registerForm.errors.email}
                </p>
              )}
            </div>

            {/* Campo de password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("RegisterPage", "password")}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={registerForm.values.password}
                onChange={(e) =>
                  registerForm.handleChange("password", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder={t("RegisterPage", "password")}
                autoComplete="off"
              />
              {!!registerForm.errors.password && (
                <p className="text-red-500 text-sm">
                  {registerForm.errors.password}
                </p>
              )}
            </div>

            {/* Campo de repeat password */}
            <div>
              <label
                htmlFor="repeatPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("RegisterPage", "repeatPassword")}
              </label>
              <input
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                value={registerForm.values.repeatPassword}
                onChange={(e) =>
                  registerForm.handleChange("repeatPassword", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder={t("RegisterPage", "repeatPassword")}
                autoComplete="off"
              />
              {!!registerForm.errors.repeatPassword && (
                <p className="text-red-500 text-sm">
                  {registerForm.errors.repeatPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }`}
            >
              {t("RegisterPage", "button.register")}
            </button>
            {/* Alerta de error */}
            {errorAlert && (
              <div
                className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-300 dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                <span>{errorAlert}</span>
              </div>
            )}
            {/* Alerta de exito */}
            {successfullAlert && (
              <div
                className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert"
              >
                <span className="font-medium">
                  {t("RegisterPage", "user.created1")}
                </span>{" "}
                {t("RegisterPage", "user.created2")}
              </div>
            )}
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              {t("RegisterPage", "has.account")}&nbsp;
              <button
                onClick={handleLoginNavigation}
                className="text-blue-700 hover:underline dark:text-blue-500 linkButton"
              >
                {t("RegisterPage", "link.login")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
