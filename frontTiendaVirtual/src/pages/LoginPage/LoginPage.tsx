import React, { useState } from "react";
import "./LoginPage.scss";
import { useTranslate } from "@/hooks/useTranslate";
import { useForm } from "@/hooks/useForm";
import { AuthService } from "@/services/auth/AuthService";
import { LoginRequest, LoginResponse } from "@/services/auth/Props/Login";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ErrorsForm, LoginForm } from "./Props/FormProps";

export const LoginPage = () => {
  const t = useTranslate();
  const auth = useAuth();
  const navigate = useNavigate();
  const authService = new AuthService();

  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (data: LoginForm) => {
    const errors: ErrorsForm = {};
    if (data.username.trim().length === 0) {
      errors.username = t("LoginPage", "error.username");
    }
    if (data.password.trim().length === 0) {
      errors.password = t("LoginPage", "error.password");
    }
    return errors;
  };

  const loginForm = useForm<LoginForm>(
    {
      username: "",
      password: "",
    },
    validate
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginForm.handleSubmit(async () => {
      setIsSubmitting(true);
      const requestData: LoginRequest = {
        username: loginForm.values.username,
        password: loginForm.values.password,
      };

      try {
        const data: LoginResponse = await authService.login(requestData);
        auth.createUserInstance(data);
        setErrorAlert(null);
        navigate("/");
      } catch (error) {
        console.error(error);
        setErrorAlert(t("LoginPage", "error.invalidCredentials"));
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  const handleRegisterNavigation = () => {
    navigate("/register");
  };

  React.useEffect(() => {
    // Forzamos a que el usuario haga logout cuando entra a esta pagina
    auth.logout();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center ">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <img
            src="src/assets/img/logo.png"
            alt="logo"
            className="w-[150px] mb-5"
          />

          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              {t("LoginPage", "title")}
            </h5>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {t("LoginPage", "username")}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={loginForm.values.username}
                onChange={(e) =>
                  loginForm.handleChange("username", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder={t("LoginPage", "username")}
                autoComplete="off"
              />
              {!!loginForm.errors.username && (
                <p className="text-red-500 text-sm">
                  {loginForm.errors.username}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {t("LoginPage", "password")}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={loginForm.values.password}
                onChange={(e) =>
                  loginForm.handleChange("password", e.target.value)
                }
                placeholder={t("LoginPage", "password")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                autoComplete="off"
              />
              {!!loginForm.errors.password && (
                <p className="text-red-500 text-sm">
                  {loginForm.errors.password}
                </p>
              )}
            </div>
            {/* Alerta de credenciales inválidas */}
            {errorAlert && (
              <div className="text-red-500 text-sm bg-red-100 border border-red-400 rounded p-2 mb-4">
                {errorAlert}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }`}>
              {t("LoginPage", "button.login")}
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              {t("LoginPage", "not.registered")}&nbsp;
              <button
                onClick={handleRegisterNavigation}
                className="text-blue-700 hover:underline dark:text-blue-500 linkButton">
                {t("LoginPage", "link.register")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
