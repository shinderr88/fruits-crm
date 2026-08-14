import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { ThemeProvider } from "@/context/ThemeContext";
import { BrandProvider } from "@/context/BrandContext";
import { LanguageProvider } from "@/context/LanguageContext";

export default function App() {
  return (
    <BrandProvider>
      <ThemeProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </ThemeProvider>
    </BrandProvider>
  );
}
