import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Palette, Laptop, Trophy, Clock, Users, BookOpen, CheckCircle2, Star, ArrowRight, Lightbulb, Eye, Smartphone, Pencil, Layout, Heart, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PricingTiers } from "./pricing-tiers";
export function UXUIDesignProgramPage({ onNavigate }) {
    const levels = [
        {
            title: "Level 1: Design Foundations (Ages 8-10)",
            duration: "3 months",
            color: "bg-orange-500",
            lightColor: "bg-orange-100",
            textColor: "text-orange-600",
            topics: [
                "Introduction to design thinking",
                "Color theory basics",
                "Typography fundamentals",
                "Drawing & sketching for design",
                "Digital tools introduction (Figma/Canva)",
                "Creative mini-projects"
            ]
        },
        {
            title: "Level 2: Digital Design (Ages 11-12)",
            duration: "3 months",
            color: "bg-pink-500",
            lightColor: "bg-pink-100",
            textColor: "text-pink-600",
            topics: [
                "User research & empathy",
                "Wireframing & prototyping",
                "Interface design principles",
                "Mobile & web design basics",
                "Design systems introduction",
                "Portfolio projects"
            ]
        },
        {
            title: "Level 3: UX/UI Mastery (Ages 13-14)",
            duration: "3 months",
            color: "bg-purple-500",
            lightColor: "bg-purple-100",
            textColor: "text-purple-600",
            topics: [
                "Advanced UX methodologies",
                "Interaction design & animation",
                "Responsive design mastery",
                "Usability testing & iteration",
                "Professional design workflow",
                "Real client projects"
            ]
        }
    ];
    const benefits = [
        {
            icon: Lightbulb,
            title: "Creative Thinking",
            description: "Develop innovative problem-solving skills through design challenges",
            color: "text-orange-600",
            bgColor: "bg-orange-100"
        },
        {
            icon: Eye,
            title: "Visual Literacy",
            description: "Learn to communicate ideas effectively through visual design",
            color: "text-pink-600",
            bgColor: "bg-pink-100"
        },
        {
            icon: Heart,
            title: "Empathy & User Focus",
            description: "Understand users deeply and design solutions that meet real needs",
            color: "text-purple-600",
            bgColor: "bg-purple-100"
        },
        {
            icon: Sparkles,
            title: "Future Career Skills",
            description: "Build a foundation for high-demand creative tech careers",
            color: "text-blue-600",
            bgColor: "bg-blue-100"
        }
    ];
    const methodology = [
        {
            step: "01",
            title: "Discover",
            description: "Research users and understand problems",
            icon: Eye
        },
        {
            step: "02",
            title: "Ideate",
            description: "Brainstorm creative solutions",
            icon: Lightbulb
        },
        {
            step: "03",
            title: "Design",
            description: "Create beautiful interfaces",
            icon: Palette
        },
        {
            step: "04",
            title: "Test",
            description: "Validate with real users",
            icon: Smartphone
        }
    ];
    const toolsAndSkills = [
        {
            category: "Design Tools",
            items: [
                { name: "Figma", description: "Professional design & prototyping" },
                { name: "Adobe Photoshop", description: "Image editing & digital art" },
                { name: "Adobe XD", description: "UI/UX design platform" },
                { name: "Adobe Illustrator", description: "Vector graphics & illustration" }
            ],
            icon: Laptop,
            color: "text-orange-600",
            bgColor: "bg-orange-100"
        },
        {
            category: "Design Skills",
            items: [
                { name: "Color Theory", description: "Psychology of colors" },
                { name: "Typography", description: "Font selection & pairing" },
                { name: "Layout Design", description: "Grid systems & composition" },
                { name: "Branding", description: "Logo & identity design" }
            ],
            icon: Palette,
            color: "text-pink-600",
            bgColor: "bg-pink-100"
        }
    ];
    const designPrinciples = [
        "Visual hierarchy & emphasis",
        "Balance & alignment",
        "Contrast & color harmony",
        "White space & breathing room",
        "Consistency & repetition",
        "Accessibility & inclusivity"
    ];
    const outcomes = [
        "Create professional portfolio with 10+ projects",
        "Master industry-standard design tools",
        "Understand user-centered design process",
        "Design mobile apps and websites",
        "Present and pitch design ideas confidently",
        "Develop unique design style and voice"
    ];
    const faqs = [
        {
            question: "Does my child need to be good at drawing to learn UX/UI?",
            answer: "Not at all! While basic sketching helps, UX/UI design is more about understanding users, solving problems creatively, and using digital tools. We teach all the foundational skills needed, including basic drawing and digital illustration techniques."
        },
        {
            question: "What equipment does my child need?",
            answer: "A computer or laptop with internet connection is essential. For advanced levels, we recommend an iPad with Apple Pencil for digital illustration, but this is optional. All software we use has free student versions (Figma, Canva)."
        },
        {
            question: "How is this different from graphic design?",
            answer: "While graphic design focuses on visual communication, UX/UI design emphasizes user experience and interface design. We teach both visual design skills AND how to research users, create wireframes, prototype interactions, and test designs with real people."
        },
        {
            question: "What age is best to start learning design?",
            answer: "We recommend starting at age 8-10 when children can understand abstract concepts and use digital tools effectively. However, creative kids as young as 7 can join our foundation level with parental support."
        },
        {
            question: "Will my child build a design portfolio?",
            answer: "Absolutely! Portfolio building is a core part of our curriculum. Students create 10-15 projects ranging from app designs to branding work, all professionally documented in their online portfolio."
        },
        {
            question: "Can this lead to a career in design?",
            answer: "Yes! UX/UI design is one of the fastest-growing and highest-paying creative careers. Our program provides the foundational skills needed to pursue design in high school, college, and professionally. Many of our students go on to freelance or intern at tech companies."
        }
    ];
    const achievements = [
        { value: "150+", label: "Student Projects" },
        { value: "95%", label: "Creativity Score" },
        { value: "4.9/5", label: "Parent Rating" },
        { value: "12+", label: "Tools Mastered" }
    ];
    const projectTypes = [
        {
            title: "Mobile App Design",
            description: "Design complete mobile applications from concept to high-fidelity prototype",
            icon: Smartphone,
            color: "text-orange-600",
            bgColor: "bg-orange-100"
        },
        {
            title: "Website Design",
            description: "Create responsive websites with modern layouts and beautiful interfaces",
            icon: Layout,
            color: "text-pink-600",
            bgColor: "bg-pink-100"
        },
        {
            title: "Branding Projects",
            description: "Develop logos, color schemes, and complete brand identity systems",
            icon: Palette,
            color: "text-purple-600",
            bgColor: "bg-purple-100"
        },
        {
            title: "Design Systems",
            description: "Build reusable component libraries and design guidelines",
            icon: BookOpen,
            color: "text-blue-600",
            bgColor: "bg-blue-100"
        }
    ];
    return (_jsxs("div", { className: "min-h-screen bg-white", children: [_jsxs("section", { className: "relative py-20 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 opacity-10", children: [_jsx("div", { className: "absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" }), _jsx("div", { className: "absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl" })] }), _jsx("div", { className: "container mx-auto px-4 relative z-10", children: _jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6 }, children: [_jsx(Badge, { className: "mb-4 bg-white/20 text-white border-white/30 px-4 py-1", children: "Design the Future" }), _jsx("h1", { className: "text-4xl md:text-6xl mb-6 font-clash", children: "UX/UI Design for Kids" }), _jsx("p", { className: "text-xl mb-8 text-orange-100 leading-relaxed", children: "Empower your child to become a creative problem-solver! Learn to design beautiful, user-friendly digital experiences while developing critical thinking and artistic skills." }), _jsxs("div", { className: "flex flex-wrap gap-4 mb-8", children: [_jsxs("div", { className: "flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2", children: [_jsx(Clock, { className: "w-5 h-5" }), _jsx("span", { children: "2 Classes/Week" })] }), _jsxs("div", { className: "flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2", children: [_jsx(Users, { className: "w-5 h-5" }), _jsx("span", { children: "Small Groups (Max 6)" })] }), _jsxs("div", { className: "flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2", children: [_jsx(Trophy, { className: "w-5 h-5" }), _jsx("span", { children: "Portfolio Building" })] })] }), _jsxs("div", { className: "flex gap-4", children: [_jsxs(Button, { size: "lg", onClick: () => {
                                                        const pricingSection = document.querySelector('.pricing-section');
                                                        if (pricingSection) {
                                                            pricingSection.scrollIntoView({ behavior: 'smooth' });
                                                        }
                                                    }, className: "bg-white text-orange-600 hover:bg-gray-100 rounded-full px-8", children: ["View Pricing", _jsx(ArrowRight, { className: "w-5 h-5 ml-2" })] }), _jsx(Button, { size: "lg", variant: "outline", className: "rounded-full px-8 border-2 border-white text-[rgb(0,0,0)] hover:bg-white/10", onClick: () => onNavigate?.("contact"), children: "Enroll Now" })] })] }), _jsxs(motion.div, { className: "relative", initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6 }, children: [_jsxs("div", { className: "relative rounded-3xl overflow-hidden shadow-2xl", children: [_jsx(ImageWithFallback, { src: "https://images.unsplash.com/photo-1714859100446-ed641aeea95c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwbGVhcm5pbmclMjBkZXNpZ24lMjBjcmVhdGl2ZSUyMGRpZ2l0YWwlMjBhcnR8ZW58MXx8fHwxNzYwMjU0NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", alt: "Kids learning design", className: "w-full h-[500px] object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-orange-900/50 to-transparent" })] }), _jsx(motion.div, { className: "absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6", animate: { y: [0, -10, 0] }, transition: { duration: 3, repeat: Infinity }, children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "bg-orange-100 p-3 rounded-xl", children: _jsx(Palette, { className: "w-8 h-8 text-orange-600" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl text-gray-900 font-clash", children: "150+" }), _jsx("div", { className: "text-sm text-gray-600", children: "Projects Created" })] })] }) })] })] }) })] }), _jsx("section", { className: "py-12 bg-white border-b", children: _jsx("div", { className: "container mx-auto px-4", children: _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8", children: achievements.map((stat, index) => (_jsxs(motion.div, { className: "text-center", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, viewport: { once: true }, children: [_jsx("div", { className: "text-3xl md:text-4xl text-orange-600 mb-2 font-clash", children: stat.value }), _jsx("div", { className: "text-sm text-gray-600", children: stat.label })] }, index))) }) }) }), _jsx("section", { className: "py-16 bg-gray-50", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs(motion.div, { className: "text-center max-w-3xl mx-auto mb-12", initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, children: [_jsxs("h2", { className: "text-3xl md:text-4xl mb-4 text-gray-900 font-clash", children: ["Why Learn ", _jsx("span", { className: "text-orange-600", children: "UX/UI Design?" })] }), _jsx("p", { className: "text-lg text-gray-600", children: "Design thinking isn't just about making things pretty\u2014it's a powerful mindset for solving problems creatively." })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: benefits.map((benefit, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, viewport: { once: true }, children: _jsxs(Card, { className: "p-6 h-full hover:shadow-lg transition-shadow border-0 rounded-2xl", children: [_jsx("div", { className: `${benefit.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-4`, children: _jsx(benefit.icon, { className: `w-7 h-7 ${benefit.color}` }) }), _jsx("h3", { className: "text-xl mb-2 text-gray-900 font-inter-tight", children: benefit.title }), _jsx("p", { className: "text-gray-600", children: benefit.description })] }) }, index))) })] }) }), _jsx("section", { className: "py-16", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs(motion.div, { className: "text-center max-w-3xl mx-auto mb-12", initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, children: [_jsxs("h2", { className: "text-3xl md:text-4xl mb-4 text-gray-900 font-clash", children: ["Design Learning ", _jsx("span", { className: "text-orange-600", children: "Journey" })] }), _jsx("p", { className: "text-lg text-gray-600", children: "From creative foundations to professional UX/UI mastery\u2014a structured path for young designers." })] }), _jsx("div", { className: "max-w-4xl mx-auto space-y-6", children: levels.map((level, index) => (_jsx(motion.div, { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, viewport: { once: true }, children: _jsx(Card, { className: "overflow-hidden border-0 rounded-2xl shadow-lg hover:shadow-xl transition-shadow", children: _jsx("div", { className: `${level.color} p-1`, children: _jsxs("div", { className: "bg-white p-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl mb-2 text-gray-900 font-inter-tight", children: level.title }), _jsxs("div", { className: "flex items-center gap-4 text-gray-600", children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "w-4 h-4" }), level.duration] }), _jsxs(Badge, { className: `${level.lightColor} ${level.textColor} border-0`, children: [level.topics.length, " Core Topics"] })] })] }), _jsx(Button, { className: `${level.color} text-white rounded-full mt-4 md:mt-0`, children: "Enroll Now" })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-3", children: level.topics.map((topic, topicIndex) => (_jsxs("div", { className: "flex items-start gap-2", children: [_jsx(CheckCircle2, { className: `w-5 h-5 ${level.textColor} flex-shrink-0 mt-0.5` }), _jsx("span", { className: "text-gray-700", children: topic })] }, topicIndex))) })] }) }) }) }, index))) })] }) }), _jsx("section", { className: "py-16 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs(motion.div, { className: "text-center max-w-3xl mx-auto mb-12", initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, children: [_jsxs("h2", { className: "text-3xl md:text-4xl mb-4 text-gray-900 font-clash", children: ["The Design ", _jsx("span", { className: "text-orange-600", children: "Thinking Process" })] }), _jsx("p", { className: "text-lg text-gray-600", children: "Learn the same creative process used by top designers at Apple, Google, and beyond." })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto", children: methodology.map((item, index) => (_jsxs(motion.div, { className: "relative", initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, viewport: { once: true }, children: [_jsxs(Card, { className: "p-6 text-center border-0 rounded-2xl bg-white shadow-lg h-full", children: [_jsx("div", { className: "text-6xl font-clash text-orange-100 mb-4", children: item.step }), _jsx("div", { className: "bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4", children: _jsx(item.icon, { className: "w-8 h-8 text-orange-600" }) }), _jsx("h3", { className: "text-xl mb-2 text-gray-900 font-inter-tight", children: item.title }), _jsx("p", { className: "text-gray-600", children: item.description })] }), index < methodology.length - 1 && (_jsx("div", { className: "hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10", children: _jsx(ArrowRight, { className: "w-6 h-6 text-orange-300" }) }))] }, index))) })] }) }), _jsx("section", { className: "py-16", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs(motion.div, { className: "text-center max-w-3xl mx-auto mb-12", initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, children: [_jsxs("h2", { className: "text-3xl md:text-4xl mb-4 text-gray-900 font-clash", children: ["Professional Tools & ", _jsx("span", { className: "text-orange-600", children: "Skills" })] }), _jsx("p", { className: "text-lg text-gray-600", children: "Master industry-standard tools and essential design principles used by professionals worldwide." })] }), _jsx("div", { className: "max-w-5xl mx-auto space-y-8", children: toolsAndSkills.map((category, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, viewport: { once: true }, children: _jsxs(Card, { className: "p-8 border-0 rounded-2xl shadow-lg", children: [_jsxs("div", { className: "flex items-center gap-4 mb-6", children: [_jsx("div", { className: `${category.bgColor} p-3 rounded-2xl`, children: _jsx(category.icon, { className: `w-6 h-6 ${category.color}` }) }), _jsx("h3", { className: "text-2xl text-gray-900 font-inter-tight", children: category.category })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-4", children: category.items.map((item, itemIndex) => (_jsxs("div", { className: "flex items-start gap-3 p-4 bg-gray-50 rounded-xl", children: [_jsx(CheckCircle2, { className: `w-5 h-5 ${category.color} flex-shrink-0 mt-0.5` }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-gray-900", children: item.name }), _jsx("div", { className: "text-sm text-gray-600", children: item.description })] })] }, itemIndex))) })] }) }, index))) })] }) }), _jsx("section", { className: "py-16 bg-gray-50", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs(motion.div, { className: "text-center max-w-3xl mx-auto mb-12", initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, children: [_jsxs("h2", { className: "text-3xl md:text-4xl mb-4 text-gray-900 font-clash", children: ["Portfolio ", _jsx("span", { className: "text-orange-600", children: "Projects" })] }), _jsx("p", { className: "text-lg text-gray-600", children: "Students build a professional portfolio through hands-on projects across multiple design disciplines." })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-6 max-w-5xl mx-auto", children: projectTypes.map((project, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, viewport: { once: true }, children: _jsx(Card, { className: "p-8 border-0 rounded-2xl hover:shadow-lg transition-shadow", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: `${project.bgColor} p-3 rounded-2xl flex-shrink-0`, children: _jsx(project.icon, { className: `w-6 h-6 ${project.color}` }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl mb-2 text-gray-900 font-inter-tight", children: project.title }), _jsx("p", { className: "text-gray-600", children: project.description })] })] }) }) }, index))) })] }) }), _jsx("section", { className: "py-16 bg-white", children: _jsx("div", { className: "container mx-auto px-4", children: _jsx("div", { className: "max-w-6xl mx-auto", children: _jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-start", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, className: "space-y-8", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-3xl md:text-4xl mb-6 text-gray-900 font-clash", children: ["Master Essential ", _jsxs("span", { className: "text-orange-600", children: ["Design", _jsx("br", {}), "Principles"] })] }), _jsx("p", { className: "text-lg text-gray-600 mb-8", children: "Learn the fundamental principles that make designs beautiful, functional, and user-friendly." })] }), _jsx("div", { className: "space-y-3", children: designPrinciples.map((principle, index) => (_jsxs(motion.div, { className: "flex items-center gap-3 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors cursor-pointer group", initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, viewport: { once: true }, whileHover: { x: 8 }, children: [_jsx(Pencil, { className: "w-5 h-5 text-orange-600 flex-shrink-0 group-hover:scale-110 transition-transform" }), _jsx("span", { className: "text-gray-700 font-medium", children: principle })] }, index))) }), _jsxs("div", { className: "pt-8", children: [_jsx("h3", { className: "text-2xl mb-6 text-gray-900 font-inter-tight", children: "What Students Achieve:" }), _jsx("div", { className: "space-y-3", children: outcomes.map((outcome, index) => (_jsxs(motion.div, { className: "flex items-start gap-3 group", initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, viewport: { once: true }, children: [_jsx(Star, { className: "w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" }), _jsx("span", { className: "text-gray-700", children: outcome })] }, index))) })] })] }), _jsx("div", { className: "relative lg:h-screen lg:sticky lg:top-24", children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, transition: { duration: 0.6 }, viewport: { once: true }, className: "h-full flex items-center", children: _jsxs("div", { className: "relative rounded-3xl overflow-hidden shadow-2xl w-full", children: [_jsx(ImageWithFallback, { src: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGRyYXdpbmclMjBza2V0Y2hpbmclMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjAyNTQ1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", alt: "Students creating designs", className: "w-full h-[500px] lg:h-[600px] object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent" }), _jsx(motion.div, { className: "absolute top-8 right-8 bg-white rounded-2xl shadow-xl p-4", animate: { y: [0, -15, 0] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-orange-100 p-2 rounded-xl", children: _jsx(Palette, { className: "w-6 h-6 text-orange-600" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-500", children: "Creative Tools" }), _jsx("div", { className: "text-lg text-gray-900 font-clash", children: "Figma" })] })] }) }), _jsx(motion.div, { className: "absolute bottom-8 left-8 bg-white rounded-2xl shadow-xl p-4", animate: { y: [0, 15, 0] }, transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-pink-100 p-2 rounded-xl", children: _jsx(Sparkles, { className: "w-6 h-6 text-pink-600" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-500", children: "Projects" }), _jsx("div", { className: "text-lg text-gray-900 font-clash", children: "150+" })] })] }) })] }) }) })] }) }) }) }), _jsx("div", { className: "pricing-section", children: _jsx(PricingTiers, { programName: "UX/UI Design", programColor: "orange" }) }), _jsx("section", { className: "py-16 bg-gray-50", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs(motion.div, { className: "text-center max-w-3xl mx-auto mb-12", initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, children: [_jsxs("h2", { className: "text-3xl md:text-4xl mb-4 text-gray-900 font-clash", children: ["Frequently Asked ", _jsx("span", { className: "text-orange-600", children: "Questions" })] }), _jsx("p", { className: "text-lg text-gray-600", children: "Everything you need to know about our UX/UI design program." })] }), _jsx("div", { className: "max-w-3xl mx-auto", children: _jsx(Accordion, { type: "single", collapsible: true, className: "space-y-4", children: faqs.map((faq, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, viewport: { once: true }, children: _jsxs(AccordionItem, { value: `item-${index}`, className: "border-0 bg-white rounded-2xl shadow-md px-6", children: [_jsx(AccordionTrigger, { className: "text-left hover:no-underline py-6", children: _jsx("span", { className: "text-lg text-gray-900 font-inter-tight pr-4", children: faq.question }) }), _jsx(AccordionContent, { className: "text-gray-600 pb-6", children: faq.answer })] }) }, index))) }) })] }) }), _jsx("section", { className: "py-20 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs(motion.div, { className: "text-center max-w-3xl mx-auto", initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, children: [_jsx("h2", { className: "text-3xl md:text-5xl mb-6 font-clash", children: "Start Your Child's Design Journey Today" }), _jsx("p", { className: "text-xl mb-8 text-orange-100", children: "Join creative students worldwide who are learning to design beautiful, user-friendly digital experiences while building valuable career skills." }), _jsx("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: _jsxs(Button, { size: "lg", onClick: () => {
                                        const pricingSection = document.querySelector('.pricing-section');
                                        if (pricingSection) {
                                            pricingSection.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }, className: "bg-white text-orange-600 hover:bg-gray-100 rounded-full px-10", children: ["View Pricing & Enroll", _jsx(ArrowRight, { className: "w-5 h-5 ml-2" })] }) }), _jsx("p", { className: "mt-6 text-sm text-orange-200", children: "No design experience needed \u2022 All tools provided \u2022 30-day money-back guarantee" })] }) }) })] }));
}
