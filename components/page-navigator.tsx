import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Home, Code, Calculator, Grid3x3, Palette } from "lucide-react";

type Page = "home" | "coding" | "math" | "abacus" | "uxui";

interface PageNavigatorProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function PageNavigator({ currentPage, onNavigate }: PageNavigatorProps) {
  const pages = [
    {
      id: "home" as Page,
      title: "Home",
      icon: Home,
      color: "bg-gray-600"
    },
    {
      id: "coding" as Page,
      title: "Coding",
      icon: Code,
      color: "bg-blue-600"
    },
    {
      id: "math" as Page,
      title: "Math",
      icon: Calculator,
      color: "bg-purple-600"
    },
    {
      id: "abacus" as Page,
      title: "Abacus",
      icon: Grid3x3,
      color: "bg-green-600"
    },
    {
      id: "uxui" as Page,
      title: "UX/UI",
      icon: Palette,
      color: "bg-pink-600"
    }
  ];

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <Card className="flex gap-2 p-3 bg-white/95 backdrop-blur-sm shadow-2xl rounded-full border-2 border-gray-200">
        {pages.map((page) => (
          <Button
            key={page.id}
            onClick={() => onNavigate(page.id)}
            variant={currentPage === page.id ? "default" : "ghost"}
            className={`rounded-full px-4 ${
              currentPage === page.id 
                ? `${page.color} text-white hover:opacity-90` 
                : 'hover:bg-gray-100'
            }`}
            size="sm"
          >
            <page.icon className="w-4 h-4 mr-2" />
            {page.title}
          </Button>
        ))}
      </Card>
    </motion.div>
  );
}
