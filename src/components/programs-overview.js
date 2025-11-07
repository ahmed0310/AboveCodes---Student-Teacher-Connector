import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Code, Calculator, Grid3x3, Palette, ArrowRight, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
export function ProgramsOverview({ onNavigate }) {
    const programs = [
        {
            id: "coding",
            title: "Coding Program",
            subtitle: "Transform Ideas into Reality",
            description: "From visual programming to professional coding languages, our comprehensive curriculum makes coding accessible and fun for all ages.",
            icon: Code,
            color: "bg-blue-600",
            lightColor: "bg-blue-100",
            textColor: "text-blue-600",
            image: "https://images.unsplash.com/photo-1560149927-7add717b9b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY29kaW5nJTIwcHJvZ3JhbW1pbmclMjBjbGFzc3xlbnwxfHx8fDE3NjAyNTM4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            highlights: [
                "Scratch to Python progression",
                "Game & app development",
                "Real-world projects",
                "Portfolio building",
                "Small class sizes (max 6)"
            ],
            page: "coding"
        },
        {
            id: "math",
            title: "Mathematics Mastery",
            subtitle: "Build Strong Foundations",
            description: "Go beyond rote learning with our Singapore Math-based curriculum that emphasizes deep understanding and problem-solving skills.",
            icon: Calculator,
            color: "bg-purple-600",
            lightColor: "bg-purple-100",
            textColor: "text-purple-600",
            image: "https://images.unsplash.com/photo-1718306201865-cae4a08311fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nJTIwbWF0aGVtYXRpY3MlMjBhYmFjdXN8ZW58MXx8fHwxNzYwMjUzODIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            highlights: [
                "Singapore Math method",
                "Mental math techniques",
                "Competition preparation",
                "Visual learning tools",
                "98% grade improvement"
            ],
            page: "math"
        },
        {
            id: "abacus",
            title: "Abacus Training",
            subtitle: "Unlock Mental Superpowers",
            description: "Ancient tool, modern results. Develop lightning-fast mental calculation skills while enhancing concentration, memory, and visualization abilities.",
            icon: Grid3x3,
            color: "bg-green-600",
            lightColor: "bg-green-100",
            textColor: "text-green-600",
            image: "https://images.unsplash.com/photo-1722912010170-704c382ca530?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc3R1ZHlpbmclMjB0b2dldGhlciUyMGdyb3VwfGVufDF8fHx8MTc2MDI1MzgyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            highlights: [
                "Physical to mental abacus",
                "10x calculation speed",
                "Enhanced concentration",
                "Photographic memory",
                "National champions trained"
            ],
            page: "abacus"
        },
        {
            id: "uxui",
            title: "UX/UI Design",
            subtitle: "Design Beautiful Experiences",
            description: "Learn to design beautiful, user-friendly digital products using industry-standard tools and design thinking principles.",
            icon: Palette,
            color: "bg-pink-600",
            lightColor: "bg-pink-100",
            textColor: "text-pink-600",
            image: "https://images.unsplash.com/photo-1714859100446-ed641aeea95c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwbGVhcm5pbmclMjBkZXNpZ24lMjBjcmVhdGl2ZSUyMGRpZ2l0YWwlMjBhcnR8ZW58MXx8fHwxNzYwMjU0NDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            highlights: [
                "Figma & professional tools",
                "Design thinking process",
                "Portfolio building",
                "Mobile & web design",
                "Real client projects"
            ],
            page: "uxui"
        }
    ];
    return (_jsx("div", { className: "py-16", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs(motion.div, { className: "text-center max-w-3xl mx-auto mb-16", initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, children: [_jsxs("h2", { className: "text-3xl md:text-5xl mb-6 text-gray-900 font-clash", children: ["Explore Our ", _jsx("span", { className: "text-blue-600", children: "Programs" })] }), _jsx("p", { className: "text-xl text-gray-600 leading-relaxed", children: "Choose the perfect learning path for your child. Each program is designed to build skills progressively while keeping learning engaging and fun." })] }), _jsx("div", { className: "space-y-12 max-w-6xl mx-auto", children: programs.map((program, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: index * 0.2 }, viewport: { once: true }, children: _jsx(Card, { className: `overflow-hidden border-0 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`, children: _jsxs("div", { className: `grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`, children: [_jsx("div", { className: `p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`, children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: `${program.lightColor} p-4 rounded-2xl`, children: _jsx(program.icon, { className: `w-8 h-8 ${program.textColor}` }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-3xl text-gray-900 font-clash", children: program.title }), _jsx("p", { className: `${program.textColor} text-lg font-medium`, children: program.subtitle })] })] }), _jsx("p", { className: "text-lg text-gray-700 leading-relaxed", children: program.description }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-semibold text-gray-900 font-inter-tight", children: "Program Highlights:" }), _jsx("div", { className: "grid gap-2", children: program.highlights.map((highlight, idx) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(CheckCircle2, { className: `w-5 h-5 ${program.textColor} flex-shrink-0` }), _jsx("span", { className: "text-gray-700", children: highlight })] }, idx))) })] }), _jsx("div", { className: "flex gap-4 pt-4", children: _jsxs(Button, { onClick: () => onNavigate(program.page), className: `${program.color} hover:opacity-90 text-white rounded-full px-8`, children: ["Explore ", program.title.split(' ')[0], _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] }) })] }) }), _jsxs("div", { className: `relative ${index % 2 === 1 ? 'lg:order-1' : ''}`, children: [_jsx(ImageWithFallback, { src: program.image, alt: `${program.title} learning`, className: "w-full h-full min-h-[400px] object-cover" }), _jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${program.color} opacity-10` })] })] }) }) }, program.id))) }), _jsxs(motion.div, { className: "mt-20 text-center max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-12 text-white", initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, children: [_jsx("h3", { className: "text-3xl md:text-4xl mb-4 font-clash", children: "Not Sure Which Program to Choose?" }), _jsx("p", { className: "text-xl mb-8 text-blue-100", children: "Our education consultants can help you find the perfect learning path for your child based on their age, interests, and goals." }), _jsx("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: _jsxs(Button, { size: "lg", onClick: () => onNavigate && onNavigate("contact"), className: "bg-orange-500 hover:bg-orange-600 text-white rounded-full px-10", children: ["Contact Us", _jsx(ArrowRight, { className: "w-5 h-5 ml-2" })] }) })] })] }) }));
}
