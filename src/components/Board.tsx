import { AddList, Indicator, List, ListIndicator } from "@/components";
import { useAppContext } from "@/context";
import React from "react";

function Board() {
  const { lists, reducer, draggingElement, setDraggingElement } =
    useAppContext();

  const [dragElementDimensions, setDragElementDimensions] = React.useState<{
    width: number;
    height: number;
  }>();

  const addNewList = (title: string) => {
    if (!title?.trim()?.length) return;

    reducer({
      type: "ADD_LIST",
      payload: { title },
    });
  };

  const onCardDrop = (position: number, listId: Id) => {
    //  source list
    const sourceList = lists.find((list) =>
      list.cards.some((card) => card.id === draggingElement?.id)
    );

    if (!sourceList) return;

    // destination list
    const destinationList = lists.find((list) => list.id === listId);

    if (!destinationList) return;

    const draggedCardIndex = sourceList.cards.findIndex(
      (card) => card.id === draggingElement?.id
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

    setDraggingElement(null);
  };

  const onListDrop = (idx: number) => {
    const listIndex = lists.findIndex(
      (list) => list.id === draggingElement?.id
    );

    if (listIndex === -1) return;

    console.log(`list of index ${listIndex} is going to place at ${idx}`);

    const newLists = lists.filter((list) => list.id !== draggingElement?.id);

    const draggingList = lists[listIndex];

    newLists.splice(idx, 0, draggingList);

    reducer({
      type: "REORDER_LISTS",
      payload: {
        newList: newLists,
      },
    });

    setDraggingElement(null);
  };

  const onListDragStart = (e: React.DragEvent<HTMLLIElement>, listId: Id) => {
    setDraggingElement({ id: listId, type: "LIST" });
    const { width, height } = e.currentTarget.getBoundingClientRect();
    setDragElementDimensions({ width, height });
  };

  return (
    <>
      <ol className="overflow-y-hidden flex overflow-x-auto p-3 h-full ">
        <ol className="flex gap-3 h-full max-h-full list-none">
          <ListIndicator
            onDrop={() => onListDrop(0)}
            h={dragElementDimensions?.height}
            w={dragElementDimensions?.width}
          />
          {lists?.map((list, idx) => (
            <React.Fragment key={list.id}>
              <List
                list={list}
                onCardDrop={(i) => onCardDrop(i, list.id)}
                onDragStarts={onListDragStart}
                onDragLeves={() => setDraggingElement(null)}
              />
              <ListIndicator
                onDrop={() => onListDrop(idx+1)}
                h={dragElementDimensions?.height}
                w={dragElementDimensions?.width}
              />
            </React.Fragment>
          ))}
          <AddList onAdd={addNewList} />
        </ol>
      </ol>
    </>
  );
}

export default Board;
