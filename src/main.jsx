import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./i18n";

createRoot(document.getElementById("root")).render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
);


