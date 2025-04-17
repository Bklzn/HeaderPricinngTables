import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeElement, setActiveElement] = useState(location.pathname);
  const menuElements = [
    { name: "Overview", path: "/" },
    { name: "Prices", path: "/prices" },
    { name: "Blog", path: "/blog" },
    { name: "Feedback", path: "/feedback" },
  ];

  useEffect(() => {
    setActiveElement(location.pathname);
  }, [location]);

  return (
    <motion.nav
      className="bg-[#2F1893] text-white py-3 mx-auto pt-17"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center text-[18px]">
        <h3 className="text-[24px] font-bold">Startup 3</h3>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          {menuElements.map((element) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              key={element.name}
              className="my-auto"
            >
              <Link
                to={element.path}
                className={`hover:underline ${
                  activeElement === element.path ? "opacity-30" : ""
                }`}
                onClick={() => navigate(element.path)}
              >
                {element.name}
              </Link>
            </motion.div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#E93A7D] px-6 py-[7px] rounded-full hover:cursor-pointer"
          >
            Purchase
          </motion.button>
        </div>

        {/* Burger icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden mt-2 space-y-2 px-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {menuElements.map((element) => (
              <motion.div
                key={element.name + "mobile"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={element.path}
                  className={`block py-2 px-4 rounded-full text-center ${
                    activeElement === element.path
                      ? "opacity-30"
                      : "hover:bg-blue-700"
                  }`}
                  onClick={() => navigate(element.path)}
                >
                  {element.name}
                </Link>
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#E93A7D] px-6 py-[7px] w-full rounded-full hover:cursor-pointer"
            >
              Purchase
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
