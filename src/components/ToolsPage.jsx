
import { useState } from "react";
import "../styles/ToolsPage.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

import { FaQrcode, FaFileCode, FaExchangeAlt, FaPalette } from 'react-icons/fa';
import { MdFormatColorText, MdOutlineImage, MdOutlineCurrencyExchange } from 'react-icons/md';
import { BiCodeAlt, BiText } from 'react-icons/bi';
import { AiOutlineFileText } from 'react-icons/ai';
import { TbBinaryTree } from 'react-icons/tb';

const toolCategoryCards = [
    {
        title: "PDF Tools",
        description: "Solve Your PDF Problems",
        color: "#7C3AED",
        count: "45+ tools",
        featured: "PDF Creator",
        link: "/pdf",
    },
    {
        title: "Image Tools",
        description: "Solve Your Image Problems",
        color: "#F97316",
        count: "30+ tools",
        featured: "Remove BG",
        link: "/image",
    },
    {
        title: "Video Tools",
        description: "Solve Your Video Problems",
        color: "#E11D48",
        count: "10+ tools",
        featured: "Mute Video",
        link: "/video",
    },
    {
        title: "AI Write",
        description: "Solve Your Text Problems",
        color: "#2563EB",
        count: "10+ tools",
        featured: "Paragraph Writer",
        link: "/ai",
    },
    {
        title: "File Tools",
        description: "Solve Your File Problems",
        color: "#0D9488",
        count: "15+ tools",
        featured: "Split Excel",
        link: "/file",
    },
];

const tools = [
    { name: "Base64 Converter", link: "/base64-converter", icon: TbBinaryTree },
    { name: "Case Converter", link: "/case-converter", icon: MdFormatColorText },
    { name: "Color Picker", link: "/color-picker", icon: FaPalette },
    { name: "Currency Converter", link: "/currency-converter", icon: MdOutlineCurrencyExchange },
    { name: "Image Resizer", link: "/image-resizer", icon: MdOutlineImage },
    { name: "JSON Formatter", link: "/json-formatter", icon: FaFileCode },
    { name: "Markdown Previewer", link: "/markdown-previewer", icon: BiCodeAlt },
    { name: "QR Code Generator", link: "/qr-code-generator", icon: FaQrcode },
    { name: "QR Code Tool", link: "/qr-code-tool", icon: FaQrcode },
    { name: "Text Diff Checker", link: "/text-diff-checker", icon: BiText },
    { name: "Unit Converter", link: "/unit-converter", icon: FaExchangeAlt },
    { name: "Word Counter", link: "/word-counter", icon: AiOutlineFileText }
];

const ToolsPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();


    const filteredTools = searchQuery.trim()
        ? tools.filter(tool =>
            tool.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];
    const toolList = filteredTools.map(({ name, link, icon: Icon }) => (
        <li key={name} className="tool-item">
            <a href={link} className="tool-link">
                <Icon className="tool-icon" />
                <span className="tool-label">{name}</span>
            </a>
        </li>
    ));


    return (
        <div className={`tools-page ${theme}`}>
            {/* Search Bar */}
            <div className="search-bar" onFocus={() => { setIsOpen(true) }} onBlur={() => { setIsOpen(false) }}>
                <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={theme}
                />
                {/* <button className={theme}>Search</button> */}
            </div>
            {isOpen && filteredTools.length > 0 && <div className="tool-dropdown">
                    <ul className="tool-list">
                        {toolList}
                    </ul>
                </div>}

            {/* Tools Grid */}
            <div className="tools-grid">
                {toolCategoryCards.length > 0 ? (
                    toolCategoryCards.map((tool, index) => (
                        <div
                            className={`tool-card ${theme}`}
                            key={index}
                            style={{ backgroundColor: tool.color }}
                            onClick={() => navigate(tool.link)}
                        >
                            <div className="tool-header">
                                <h3>{tool.title}</h3>
                                <span className="tool-count">{tool.count}</span>
                            </div>
                            <p>{tool.description}</p>
                            <div className="tool-footer">
                                <span>Featured Tool:</span>
                                <strong>{tool.featured}</strong>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-results">No cards found 😔</p>
                )}
            </div>
        </div>
    );
};

export default ToolsPage;

