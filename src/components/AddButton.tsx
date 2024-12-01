import React, { ReactNode } from "react";
import { FaPlus, FaXmark } from "react-icons/fa6";

export function AddList() {
  const [isClicked, setIsClicked] = React.useState<boolean>(false);
  return (
    <>
      {isClicked ? (
        <div className="bg-background-list flex-shrink-0 w-[272px] h-fit p-3 rounded-xl">
          <div className="mb-3">
            <input
              type="text"
              className="w-full pl-2 text-sm py-1 rounded-sm"
              autoFocus
              placeholder="Enter list name..."
            />
          </div>
          <div className="flex justify-start items-center gap-2">
            <button className="text-sm text-white bg-background-primary rounded-md py-[6px] px-3">
              Add list
            </button>
            <button
              onClick={() => setIsClicked(false)}
              className="w-fit px-2 py-[7px] rounded-md hover:bg-black/10"
            >
              <FaXmark size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsClicked(true)}
          className="h-fit flex-shrink-0 bg-background-list/20 hover:bg-background-list/15 w-[272px] rounded-xl p-3"
        >
          <div className="flex gap-2 items-center justify-start text-white">
            <FaPlus size={14} />
            <span className="text-sm">Add another list</span>
          </div>
        </button>
      )}
    </>
  );
}

export function AddCard() {
  const [isClicked, setIsClicked] = React.useState<boolean>(false);
  return (
    <>
      {isClicked ? (
        <div className="bg-background-list w-full h-fit p-2 rounded-xl">
          <div className="mb-3">
            <textarea
              autoFocus
              className="w-full pl-2 text-sm py-1 border-2 outline-none shadow-sm rounded-lg resize-none"
              placeholder="Enter a title or paste a link"
            />
          </div>
          <div className="flex justify-start items-center gap-2">
            <button className="text-sm text-white bg-background-primary rounded-md py-[6px] px-3">
              Add card
            </button>
            <button
              onClick={() => setIsClicked(false)}
              className="w-fit px-2 py-[7px] rounded-md hover:bg-black/10"
            >
              <FaXmark size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-2">
          <button
            onClick={() => setIsClicked(true)}
            className="h-fit hover:bg-black/10 w-full rounded-lg px-3 py-[6px]"
          >
            <div className="flex gap-2 items-center justify-start text-black">
              <FaPlus size={14} />
              <span className="text-sm">Add a card </span>
            </div>
          </button>
        </div>
      )}
    </>
  );
}
