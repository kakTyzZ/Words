import React from "react";

export default function HabrComponent({ color, dark, form }) {
  //index 0 == light color, index 1 === dark color
  const colors = {
    yellow: {
      one: "#DCC655",
      two: "#936409",
    },
    red: {
      one: "#DB2C2C",
      two: "#7B0A0A",
    },
    blue: {
      one: "#5A7DD6",
      two: "#291A82",
    },
    green: {
      one: "#5CB69B",
      two: "#175744",
    },
  };

  return (
    <div
      style={{
        width: "128px",
        height: "128px",
        backgroundColor: dark ? colors[color].two : colors[color].one,
        borderRadius: form === "circle" ? "50%" : "",
      }}
    ></div>
  );
}
