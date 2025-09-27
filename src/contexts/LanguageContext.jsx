// import React, { createContext, useContext, useState, useEffect } from "react";
// //@ts-ignore
// import languageData from "../data/languageData.json";

// const LanguageContext = createContext(null);

// export const LanguageProvider = ({ children }) => {
//     const [language, setLanguage] = useState("en");

//     // Load from localStorage if available
//     useEffect(() => {
//         const savedLang = localStorage.getItem("language");
//         if (savedLang) {
//             setLanguage(savedLang);
//         }
//     }, []);

//     useEffect(() => {
//         localStorage.setItem("language", language);
//     }, [language]);

//     const t = (section, key) => {
//         return languageData[language]?.[section]?.[key] || key;
//     };

//     return (
//         <LanguageContext.Provider value={{ language, setLanguage, t }}>
//             {children}
//         </LanguageContext.Provider>
//     );
// };

// export const useLanguage = () => useContext(LanguageContext);


import React, { createContext, useContext, useState, useEffect } from "react";
//@ts-ignore
import languageData from "../data/languageData.json";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");

    // Load from localStorage if available
    useEffect(() => {
        const savedLang = localStorage.getItem("language");
        if (savedLang) {
            setLanguage(savedLang);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    const t = (section, key) => {
        // Handle nested keys like 'unitConverter.categories.length'
        if (key.includes('.')) {
            const keys = key.split('.');
            let current = languageData[language]?.[section];
            
            for (const k of keys) {
                current = current?.[k];
                if (current === undefined) break;
            }
            return current || keys[keys.length - 1]; // Return last key part as fallback
        }
        
        return languageData[language]?.[section]?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);