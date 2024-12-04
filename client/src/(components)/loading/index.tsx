import { useAppSelector } from "../../redux";

export const Loading = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  return (
    <div className="flex justify-center items-center h-64">
      <div
        className={`animate-spin rounded-full h-16 w-16 border-b-2 ${
          isDarkMode ? "border-black" : "border-gray-800"
        }`}
      ></div>
      <span className={`ml-4`}>Carregando dados...</span>
    </div>
  );
};
