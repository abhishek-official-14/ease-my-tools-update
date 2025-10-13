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
    const [currentSlide, setCurrentSlide] = useState(0);
    const { theme } = useTheme();
    const { t } = useTranslation("tools");

    const toolCategories = getToolCategories();
    const allTools = getAllTools();

    const filteredTools = searchQuery.trim()
        ? allTools.filter((tool) =>
            tool.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const toolList = filteredTools.map(({ name, link, icon: Icon }) => (
        <li key={name} className="tool-item">
            <div
                className="tool-link"
                onClick={() => {
                    navigate(link);
                }}
            >
                <Icon className="tool-icon" />
                <span className="tool-label">{name}</span>
            </div>
        </li>
    ));

    const cardsPerSlide = 4;
    const totalSlides = Math.ceil(toolCategories.length / cardsPerSlide);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <>
            <Header />
            <div className={`tools-page ${theme}`}>
                {/* 🔍 Search Bar */}
                <div className="search-container">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder={t("searchPlaceholder")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsOpen(true)}
                            onBlur={() => setTimeout(() => setIsOpen(false), 500)}
                        />
                    </div>
                    {isOpen && filteredTools.length > 0 && (
                        <div className="tool-dropdown">
                            <ul className="tool-list">{toolList}</ul>
                        </div>
                    )}
                </div>

                {/* 🎠 Tool Categories Slider */}
                <div className="categories-slider">
                    <div className="cards-grid-wrapper">
                        <button className="nav-arrow nav-prev" onClick={prevSlide}>
                            ‹
                        </button>
                        <button className="nav-arrow nav-next" onClick={nextSlide}>
                            ›
                        </button>

                        <div className="slider-container">
                            <div
                                className="slider-track"
                                style={{
                                    transform: `translateX(-${currentSlide * 100}%)`,
                                }}
                            >
                                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                    <div key={slideIndex} className="cards-grid">
                                        {toolCategories
                                            .slice(
                                                slideIndex * cardsPerSlide,
                                                slideIndex * cardsPerSlide + cardsPerSlide
                                            )
                                            .map((category) => (
                                                <div
                                                    key={category.id}
                                                    className="category-card"
                                                    style={{ backgroundColor: category.color }}
                                                    onClick={() => navigate(category.link)}
                                                >
                                                    <div className="card-top">
                                                        <div className="card-icon">
                                                            <category.icon />
                                                        </div>
                                                        <div className="card-title">{category.title}</div>
                                                        <div className="tools-count">
                                                            {category.count} tools
                                                        </div>
                                                    </div>
                                                    <p className="card-description">
                                                        {category.description}
                                                    </p>
                                                    <div className="card-footer">Click to explore →</div>
                                                </div>
                                            ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ⚫ Slider Dots
                    {totalSlides > 1 && (
                        <div className="slider-dots">
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === currentSlide ? "active" : ""
                                        }`}
                                    onClick={() => goToSlide(index)}
                                />
                            ))}
                        </div>
                    )} */}
                </div>
            </div>
        </>
    );
};

export default ToolsPage;
