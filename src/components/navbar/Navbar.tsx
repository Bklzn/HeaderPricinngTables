import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeElement, setActiveElement] = useState(location.pathname);
  const menuElements = [
    {
      name: "Overview",
      path: "/",
    },
    {
      name: "Prices",
      path: "/prices",
    },
    {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "Feedback",
      path: "/feedback",
    },
  ];

  useEffect(() => {
    setActiveElement(location.pathname);
  }, [location]);

  return (
    <nav className="bg-[#2F1893] text-white py-3 mx-auto pt-17">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-[18px]">
        <h3 className="text-[24px] font-bold">Startup 3</h3>

        {/* Menu desktop */}
        <div className="hidden md:flex space-x-8">
          {menuElements.map((element) => (
            <Link
              key={element.name}
              to={element.path}
              className={`hover:underline my-auto ${
                activeElement == element.path ? "opacity-30" : ""
              }`}
              onClick={() => navigate(element.path)}
            >
              {element.name}
            </Link>
          ))}
          <button className="bg-[#E93A7D] px-6 py-[7px] rounded-full hover:cursor-pointer">
            Purchase
          </button>
        </div>

        {/* Burger icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-2">
          {menuElements.map((element) => (
            <Link
              to={element.path}
              key={element.name + "mobile"}
              className={`block py-2 px-4 rounded-full text-center ${
                activeElement == element.path
                  ? "opacity-30"
                  : "hover:bg-blue-700 "
              }`}
              onClick={() => navigate(element.path)}
            >
              {element.name}
            </Link>
          ))}
          <button className="bg-[#E93A7D] px-6 py-[7px] w-full rounded-full hover:cursor-pointer">
            Purchase
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
