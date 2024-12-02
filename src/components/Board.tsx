import { AddList, List } from "@/components";
import { useAppContext } from "@/context";
import React from "react";

function Board() {
  const { lists, reducer } = useAppContext();

  const [draggingCard, setDraggingCard] = React.useState<Id | null>(null);

  const addNewList = (title: string) => {
    if (!title?.trim()?.length) return;

    reducer({
      type: "ADD_LIST",
      payload: { title },
    });
  };

  const onCardDrop = (position: number, listId: Id) => {
    console.log(
      `card is going to place in list ${listId} at postion ${position}`
    );

    //  source list
    const sourceList = lists.find((list) =>
      list.cards.some((card) => card.id === draggingCard)
    );

    if (!sourceList) return;

    // destination list
    const destinationList = lists.find((list) => list.id === listId);

    if (!destinationList) return;

    const draggedCardIndex = sourceList.cards.findIndex(
      (card) => card.id === draggingCard
    );

    if (draggedCardIndex === -1) return;

    const [draggedCard] = sourceList.cards.splice(draggedCardIndex, 1);

    const updatedCards = [...destinationList.cards];
    updatedCards.splice(position, 0, draggedCard);

    reducer({
      type: "REORDER_CARDS",
      payload: {
        cards: sourceList.cards,
        listId: sourceList.id,
      },
    });
    reducer({
      type: "REORDER_CARDS",
      payload: {
        cards: updatedCards,
        listId,
      },
    });

    setDraggingCard(null);
  };

  return (
    <>
      <ol className="overflow-y-hidden flex overflow-x-auto p-3 h-full ">
        <div className="flex gap-3 h-full max-h-full">
          {lists?.map((list) => (
            <List
              key={list.id}
              list={list}
              setDragCard={setDraggingCard}
              onCardDrop={(i) => onCardDrop(i, list.id)}
            />
          ))}
          <AddList onAdd={addNewList} />
        </div>
      </ol>
    </>
  );
}

export default Board;
