import { Menu } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsSidebarCollapsed } from "../state";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toogleSideBar = () => {
    console.log(isSidebarCollapsed);
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  return (
    <div>
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
      <div>Dashboard</div>
    </div>
  );
};
