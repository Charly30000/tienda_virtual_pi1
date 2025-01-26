import { useTranslate } from "@/hooks/useTranslate";
import React from "react";

const AdminCartPerson = () => {
  const person = {
    name: "Sony",
  };

  const t = useTranslate();

  return (
    <div className="flex mt-5 items-center border p-3 rounded-sm justify-between gap-3">
      <div className="w-1/4 flex items-center">
        <h3 className=" px-10">{person.name}</h3>
      </div>

      <div className="flex w-2/4 items-center justify-between">
        <label htmlFor="isCompany" className="flex gap-3">
          {t("adminCartPerson", "isCompany")}
          <input type="checkbox" name="isCompany" id="isCompany" />
        </label>

        <label htmlFor="isBlocked" className="flex gap-3">
          {t("adminCartPerson", "isBlocked")}
          <input type="checkbox" name="isBlocked" id="isBlocked" />
        </label>

        <button
          type="button"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100">
          {t("adminCartPerson", "block")}
        </button>
      </div>
    </div>
  );
};

export default AdminCartPerson;
