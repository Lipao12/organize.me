"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "../../state";

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toogleSideBar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const changeDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  const sidebarClassNames = `flex fixed flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      <div className="flex flex-col py-12 justify-between">
        <div
          className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
            isSidebarCollapsed ? "px-5" : "px-8"
          }`}
        >
          <div>Logo</div>
          <h1
            className={`font-extrabold text-2xl ${
              isSidebarCollapsed ? "hidden" : "block"
            }`}
          >
            DREMED
          </h1>
          <button
            className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
            onClick={() => {
              toogleSideBar();
            }}
            type="button"
          >
            {""}
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* LINKS */}
        <div className="flex-grow mt-8"></div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              changeDarkMode();
            }}
            type="button"
            className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 mb-4"
          >
            {""}
            {isDarkMode ? (
              <Sun className="cursor-pointer text-gray-500" size={24} />
            ) : (
              <Moon className="cursor-pointer text-gray-500" size={24} />
            )}
          </button>

          <div className="mt-3">
            <p className="text-center text-xs text-gray-500">
              &copy; 2024 DREMED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
