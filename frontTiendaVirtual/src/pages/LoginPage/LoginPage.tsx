import React from "react";
import "./LoginPage.scss";
import { useTranslate } from "@/hooks/useTranslate";

export const LoginPage = () => {
  const t = useTranslate();

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              {t("LoginPage", "title")}
            </h5>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("LoginPage", "username")}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder={t("LoginPage", "username")}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("LoginPage", "password")}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder={t("LoginPage", "password")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t("LoginPage", "button.login")}
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              {t("LoginPage", "not.registered")}&nbsp;
              <a
                href="#"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                {t("LoginPage", "link.register")}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
