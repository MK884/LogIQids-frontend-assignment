export const reducer = (
  state: Array<IList>,
  action: ListActions
): Array<IList> => {
  switch (action.type) {
    case "ADD_LIST": {
      let title = action.payload?.title;
      return [...state, { id: generateId(), title, cards: [] }];
    }

    case "REMOVE_LIST": {
      let listId = action.payload?.id;
      const newLists = state?.filter((list) => list.id !== listId);
      return newLists;
    }

    case "UPDATE_LIST_TITLE": {
      const { id: listId, title: newTitle } = action.payload;
      return state.map((list) =>
        list.id === listId ? { ...list, title: newTitle } : list
      );
    }

    case "ADD_CARD": {
      const { cardTitle, listId } = action.payload;
      return state?.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: [
                ...list.cards,
                { id: generateId(), title: cardTitle, status: "PENDING" },
              ],
            }
          : list
      );
    }

    case "UPDATE_CARD": {
      const { card, listId } = action.payload;
      if (!card || !listId) return state;

      return state.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.map((c) =>
                c.id === card.id ? { ...c, ...card } : c
              ),
            }
          : list
      );
    }

    case "REMOVE_CARD": {
      const { listId, cardId } = action.payload;

      return state?.map((list) =>
        list.id === listId
          ? { ...list, cards: list.cards?.filter((card) => card.id !== cardId) }
          : list
      );
    }

    case "RESET_ALL": {
      return [];
    }

    default: {
      console.log("No such action exists ");
      return state;
    }
  }
};

function generateId() {
  return Math.floor(Math.random() * 10000).toString();
}
