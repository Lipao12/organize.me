import React from "react";

interface GoogleButtonProps {
  isLoading?: boolean;
  onClick?: () => void;
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({
  isLoading = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={`flex items-center justify-center w-full py-3 text-zinc-600 bg-white border border-zinc-300 rounded-md text-lg font-medium hover:bg-zinc-200 ${
        isLoading
          ? "cursor-not-allowed opacity-50"
          : "hover:bg-gray-100 transform duration-200"
      }`}
    >
      {/* Ícone do Google */}
      <svg
        className="w-5 h-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.05 0 5.34 1.32 6.57 2.43l4.89-4.89C32.59 4.79 28.67 3 24 3 14.71 3 7.06 8.48 4.1 16.03l5.85 4.55C11.51 14.2 17.26 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.5 24.5c0-1.62-.13-3.16-.37-4.67H24v9.22h12.7c-.56 2.88-2.26 5.35-4.82 7.02l7.42 5.77c4.34-3.97 6.8-9.84 6.8-16.34z"
        />
        <path
          fill="#FBBC04"
          d="M9.95 28.04A14.93 14.93 0 0 1 9 24c0-1.42.23-2.8.63-4.11l-5.86-4.56A24.12 24.12 0 0 0 3 24c0 3.77.89 7.34 2.46 10.44l5.96-4.61z"
        />
        <path
          fill="#34A853"
          d="M24 46c6.21 0 11.42-2.04 15.23-5.55l-7.42-5.77c-2.03 1.37-4.64 2.17-7.81 2.17-6 0-11.1-4.05-12.94-9.51l-5.96 4.61C12.76 41.52 17.98 46 24 46z"
        />
      </svg>
      {isLoading ? "Loading..." : "Continue with Google"}
    </button>
  );
};
