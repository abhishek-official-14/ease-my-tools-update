import { useState } from "react";
import "../styles/ToolsPage.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { getToolCategories, getAllTools } from "../data/toolsData";
import Header from "./Header";

const ToolsPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();
    const { t } = useTranslation('tools');

    const toolCategories = getToolCategories();
    const allTools = getAllTools();

    const filteredTools = searchQuery.trim()
        ? allTools.filter(tool =>
            tool.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const toolList = filteredTools.map(({ name, link, icon: Icon }) => (
        <li key={name} className="tool-item">
            <div className="tool-link" onClick={() => navigate(link)}>
                <Icon className="tool-icon" />
                <span className="tool-label">{name}</span>
            </div>
        </li>
    ));

    return (
        <>
            <Header />
            <div className={`tools-page ${theme}`}>
                <div className="search-container">
                    <div className="search-bar" onFocus={() => setIsOpen(true)}>
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={theme}
                        />
                    </div>

                    {isOpen && filteredTools.length > 0 && (
                        <div className="tool-dropdown">
                            <ul className="tool-list">
                                {toolList}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="tools-grid">
                    {toolCategories.map((category) => (
                        <div
                            className={`tool-card ${theme}`}
                            key={category.id}
                            style={{ backgroundColor: category.color }}
                            onClick={() => navigate(category.link)}
                        >
                            <div className="tool-header">
                                <category.icon className="category-icon" />
                                <h3>{category.title}</h3>
                                <span className="tool-count">{category.count}</span>
                            </div>
                            <p>{category.description}</p>
                            <div className="tool-footer">
                                <span>Click to explore</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ToolsPage;