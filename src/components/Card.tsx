import React from "react";

function Card() {
  return (
    <li className="isolate relative shadow-sm cursor-pointer" draggable>
      <div className="bg-background-card flex-1 text-sm px-3 py-2 flex items-center rounded-lg border-2 hover:border-background-primary">
        Card
      </div>
    </li>
  );
}

export default Card;
