import React from "react";
import classes from "./HabrFilter.module.css";
import HabrComponent from "./habrComponent";

export function HabrFilter({ items, columns }) {
  function generateId() {
    return Math.random() * 9999;
  }
  let x;
  if (columns == 4) {
    x = {
      style: {
        gridTemplateColumns: `repeat(4,128px)`,
      },
    };
  } else if (columns == 3) {
    x = {
      style: {
        gridTemplateColumns: `repeat(3,128px)`,
      },
    };
  } else if (columns == 2) {
    x = {
      style: {
        gridTemplateColumns: `repeat(2,128px)`,
      },
    };
  } else {
    x = {
      style: {
        gridTemplateColumns: `repeat(1,128px)`,
      },
    };
  }

  return (
    <div className={classes.container} {...x}>
      {items.length > 1 &&
        items.map((item) => (
          <div key={generateId()} className={classes.containerDiv}>
            <HabrComponent
              color={item.color}
              form={item.form}
              dark={item.dark}
            />
          </div>
        ))}
    </div>
  );
}
