// import React, { useState } from "react";
// import { useTheme } from "../contexts/ThemeContext"; // your theme context

// export default function LanguageSelector() {
//     const [open, setOpen] = useState(false);
//     const [selected, setSelected] = useState("English");
//     const { theme } = useTheme();

//     const languages = ["English", "हिन्दी"];

//     return (
//         <div
//             className={`language-selector ${theme}`}
//             onMouseEnter={() => setOpen(true)}
//             onMouseLeave={() => setOpen(false)}
//         >
//             <button className="language-btn">
//                 🌐 {selected}
//                 <span className="arrow">▼</span>
//             </button>

//             {open && (
//                 <ul className="language-dropdown">
//                     {languages.map((lang) => (
//                         <li
//                             key={lang}
//                             className={selected === lang ? "active" : ""}
//                             onClick={() => {
//                                 setSelected(lang);
//                                 setOpen(false);
//                             }}
//                         >
//                             {lang}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }


import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageSelector() {
    const [open, setOpen] = useState(false);
    const { theme } = useTheme();
    const { language, setLanguage } = useLanguage();

    const languages = [
        { code: "en", label: "English" },
        { code: "hi", label: "हिन्दी" }
    ];

    const selectedLang = languages.find((l) => l.code === language);

    return (
        <div
            className={`language-selector ${theme}`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button className="language-btn">
                🌐 {selectedLang?.label}
                <span className="arrow">▼</span>
            </button>

            {open && (
                <ul className="language-dropdown">
                    {languages.map((lang) => (
                        <li
                            key={lang.code}
                            className={language === lang.code ? "active" : ""}
                            onClick={() => {
                                setLanguage(lang.code);
                                setOpen(false);
                            }}
                        >
                            {lang.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

