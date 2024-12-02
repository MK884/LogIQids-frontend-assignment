import { LuTrash2 } from "react-icons/lu";
import Card from "./Card";
import { AddCard } from "./AddButton";
import { useAppContext } from "@/context";
import React from "react";
import Indicator from "./Indicator";
function List({
  list,
  onCardDrop,
  onDragLeves,
  onDragStarts,
}: {
  list: IList;
  onCardDrop: (cardId: number) => void;
  onDragStarts: (e: React.DragEvent<HTMLLIElement>, id: Id) => void;
  onDragLeves: (e: React.DragEvent<HTMLLIElement>) => void;
}) {
  const { reducer, setDraggingElement, draggingElement } = useAppContext();
  const [title, setTitle] = React.useState<string>(list.title ?? "");
  const [isEditing, setisEditing] = React.useState<boolean>(false);
  const [dragElementDimensions, setDragElementDimensions] = React.useState<{
    width: number;
    height: number;
  }>();

  const removeList = () => {
    reducer({
      type: "REMOVE_LIST",
      payload: { id: list.id },
    });
  };

  const updateTitle = () => {
    setisEditing(false);

    if (list.title.trim() === title) return;

    reducer({
      type: "UPDATE_LIST_TITLE",
      payload: { id: list.id, title: title.trim() },
    });
  };

  const addNewCard = (title: string) => {
    if (!title?.trim()?.length) return;

    reducer({
      type: "ADD_CARD",
      payload: { cardTitle: title, listId: list.id },
    });
  };

  const onCardDragStart = (e: React.DragEvent<HTMLLIElement>, id: Id) => {
    setDraggingElement({ id, type: "CARD" });
    e.stopPropagation();
    const { width, height } = e.currentTarget.getBoundingClientRect();
    setDragElementDimensions({ width, height });
  };

  return (
    <li
      className="flex-shrink-0 block"
      draggable={!draggingElement?.type}
      onDragStart={(e) => onDragStarts(e, list.id)}
      onDragEnd={onDragLeves}
    >
      <div className="w-[272px] max-h-full flex flex-col bg-background-list rounded-xl">
        {/* header */}
        <div className="px-3 pt-3 flex items-center justify-between">
          <input
            type="text"
            className={`w-full pl-2 text-sm py-1 rounded-sm outline-background-primary ${
              !isEditing
                ? "bg-transparent cursor-pointer"
                : "bg-white cursor-text"
            }`}
            value={title}
            readOnly={!isEditing}
            onChange={(e) => setTitle(e.target.value)}
            onClick={() => setisEditing(true)}
            onBlur={updateTitle}
          />
          <button
            onClick={removeList}
            className="w-fit px-2 py-[7px] rounded-md text-red-600 hover:bg-red-100"
          >
            <LuTrash2 size={14} />
          </button>
        </div>

        {/* cards */}
        <ol className="p-2 flex-1 flex flex-col overflow-y-auto overflow-x-hidden list-none">
          <Indicator
            onDrop={() => onCardDrop(0)}
            h={dragElementDimensions?.height}
            w={dragElementDimensions?.width}
          />
          {list?.cards?.map((card, idx) => (
            <React.Fragment key={card.id}>
              <Card
                card={card}
                listId={list.id}
                listTitle={list.title}
                onDragStarts={(e) => onCardDragStart(e, card.id)}
                onDragLeves={() => setDraggingElement(null)}
              />
              <Indicator
                onDrop={() => onCardDrop(idx + 1)}
                h={dragElementDimensions?.height}
                w={dragElementDimensions?.width}
              />
            </React.Fragment>
          ))}
        </ol>

        {/* footer */}
        <div className="">
          <AddCard onAdd={addNewCard} />
        </div>
      </div>
    </li>
  );
}

export default List;
