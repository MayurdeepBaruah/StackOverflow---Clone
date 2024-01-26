import React from "react";
import "./RightSidebar.css"
function WidgetTags() {
  const tags = [
    "C",
    "CSS",
    "express",
    "Firebase",
    "HTML",
    "Java",
    "JavaScript",
    "MERN",
    "MongoDB",
    "MySQL",
    "Next.JS",
    "Node.JS",
    "PHP",
    "Python",
    "ReactJS",
  ];
  return <div className="widget-tags">
    <h4>Watched tags</h4>
    <div className="widget-tags-div">
        {
            tags.map((tag)=>(
                <p key={tag}>{tag}</p>
            ))
        }
    </div>
  </div>;
}

export default WidgetTags;
