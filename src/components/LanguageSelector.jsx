import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
    const [open, setOpen] = useState(false);
    const { theme } = useTheme();
    const { i18n } = useTranslation();

    const languages = [
        { code: "en", label: "English" },
        { code: "hi", label: "हिन्दी" }
    ];

    const currentLang = i18n.language || "en";

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        setOpen(false);
    };

    return (
        <div
            className={`language-selector ${theme}`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button className="language-btn">
                🌐 {languages.find((l) => l.code === currentLang)?.label}
                <span className="arrow">▼</span>
            </button>

            {open && (
                <ul className="language-dropdown">
                    {languages.map((lang) => (
                        <li
                            key={lang.code}
                            className={currentLang === lang.code ? "active" : ""}
                            onClick={() => changeLanguage(lang.code)}
                        >
                            {lang.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
