import React from "react";

function Avatar({
  children,
  backgroundColor,
  padding,
  color,
  borderRadius,
  fontSize,
  px,
  py, 
  cursor
}) {
  const style = {
    backgroundColor,
    padding: `${py} ${px}`,
    color : color || "black",
    borderRadius,
    fontSize,
    textAlign: "center",
    cursor: cursor || null ,
    textDecoration: "none"
  };
  return <div style={style}>{children}</div>;
}

export default Avatar;
