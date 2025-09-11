// import React, { useState } from "react";
// import "../styles/ToolsPage.css";
// import { useNavigate } from "react-router-dom";

// const tools = [
//   {
//     title: "PDF Tools",
//     description: "Solve Your PDF Problems",
//     color: "#7C3AED",
//     count: "45+ tools",
//     featured: "PDF Creator",
//     link: "/pdf"
//   },
//   {
//     title: "Image Tools",
//     description: "Solve Your Image Problems",
//     color: "#F97316",
//     count: "30+ tools",
//     featured: "Remove BG",
//     link: "/image"
//   },
//   {
//     title: "Video Tools",
//     description: "Solve Your Video Problems",
//     color: "#E11D48",
//     count: "10+ tools",
//     featured: "Mute Video",
//     link: "/video"
//   },
//   {
//     title: "AI Write",
//     description: "Solve Your Text Problems",
//     color: "#2563EB",
//     count: "10+ tools",
//     featured: "Paragraph Writer",
//     link: "/ai"
//   },
//   {
//     title: "File Tools",
//     description: "Solve Your File Problems",
//     color: "#0D9488",
//     count: "15+ tools",
//     featured: "Split Excel",
//     link: "/file"
//   }
// ];

// const ToolsPage = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter tools dynamically
//   const filteredTools = tools.filter(tool =>
//     tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     tool.featured.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="tools-page">
//       {/* Search Bar */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search tools..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button>Search</button>
//       </div>

//       {/* Tools Grid */}
//       <div className="tools-grid">
//         {filteredTools.length > 0 ? (
//           filteredTools.map((tool, index) => (
//             <div
//               className="tool-card"
//               key={index}
//               style={{ backgroundColor: tool.color }}
//               onClick={() => navigate(tool.link)}
//             >
//               <div className="tool-header">
//                 <h3>{tool.title}</h3>
//                 <span className="tool-count">{tool.count}</span>
//               </div>
//               <p>{tool.description}</p>
//               <div className="tool-footer">
//                 <span>Featured Tool:</span>
//                 <strong>{tool.featured}</strong>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="no-results">No tools found 😔</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ToolsPage;



import React, { useState } from "react";
import "../styles/ToolsPage.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const tools = [
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

const ToolsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();

  // Filter tools dynamically
  const filteredTools = tools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.featured.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`tools-page ${theme}`}>
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={theme}
        />
        <button className={theme}>Search</button>
      </div>

      {/* Tools Grid */}
      <div className="tools-grid">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool, index) => (
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
          <p className="no-results">No tools found 😔</p>
        )}
      </div>
    </div>
  );
};

export default ToolsPage;

