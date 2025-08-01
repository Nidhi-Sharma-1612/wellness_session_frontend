import { LogOut } from "lucide-react";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 bg-purple-600 text-white px-4 sm:px-6 py-3 shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          🧘 Wellness Session
        </h1>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
