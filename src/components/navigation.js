import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Menu, X, Code } from "lucide-react";
export function Navigation({ onNavigate }) {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = [
        { name: "Home", href: "#", page: "home" },
        { name: "About", href: "#about" },
        { name: "Programs", href: "#programs" },
        { name: "Why Choose Us", href: "#why-choose" },
        { name: "Contact", href: "#", page: "contact" }
    ];
    return (_jsx("nav", { className: "bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsxs(motion.div, { className: "flex items-center gap-2", initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5 }, children: [_jsx("div", { className: "w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center", children: _jsx(Code, { className: "w-6 h-6 text-white" }) }), _jsx("span", { className: "text-xl text-gray-900 font-clash font-semibold", children: "AboveCodes" })] }), _jsx("div", { className: "hidden md:flex items-center space-x-8", children: navLinks.map((link, index) => (_jsxs(motion.a, { href: link.href, onClick: (e) => {
                                    if (onNavigate && link.page) {
                                        e.preventDefault();
                                        onNavigate(link.page);
                                    }
                                }, className: "text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group cursor-pointer", initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, children: [link.name, _jsx("span", { className: "absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full" })] }, link.name))) }), _jsx(motion.div, { className: "hidden md:flex items-center gap-4", initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5 }, children: _jsx(Button, { onClick: () => onNavigate && onNavigate("contact"), className: "bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6", children: "Get Started" }) }), _jsx("button", { className: "md:hidden", onClick: () => setIsOpen(!isOpen), children: isOpen ? (_jsx(X, { className: "w-6 h-6 text-gray-600" })) : (_jsx(Menu, { className: "w-6 h-6 text-gray-600" })) })] }), isOpen && (_jsx(motion.div, { className: "md:hidden py-4 border-t border-gray-200", initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.3 }, children: _jsxs("div", { className: "flex flex-col space-y-4", children: [navLinks.map((link) => (_jsx("a", { href: link.page ? "#" : link.href, onClick: (e) => {
                                    if (link.page && onNavigate) {
                                        e.preventDefault();
                                        onNavigate(link.page);
                                    }
                                    setIsOpen(false);
                                }, className: "text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2", children: link.name }, link.name))), _jsx("div", { className: "flex flex-col gap-3 pt-4 border-t border-gray-200", children: _jsx(Button, { className: "bg-orange-500 hover:bg-orange-600 text-white", onClick: () => {
                                        setIsOpen(false);
                                        onNavigate && onNavigate("contact");
                                    }, children: "Get Started" }) })] }) }))] }) }));
}
