type Id = string | number;
type CardStatus = "PENDING" | "DONE";

interface ICard {
  id: Id;
  title: string;
  description?: string;
  duDate?: string;
  status: CardStatus;
}

interface IList {
  id: Id;
  title: string;
  cards: Array<ICard>;
}

type ListActions =
  | { type: "ADD_LIST"; payload: { title: string } }
  | { type: "REMOVE_LIST"; payload: { id: Id } }
  | { type: "UPDATE_LIST_TITLE"; payload: { id: Id; title: string } }
  | { type: "ADD_CARD"; payload: { cardTitle: string; listId: Id } }
  | { type: "UPDATE_CARD"; payload: { card: Partial<ICard>; listId: Id } }
  | { type: "REMOVE_CARD"; payload: { cardId: Id; listId: Id } }
  | { type: "REORDER_CARDS"; payload: { cards: Array<ICard>; listId: Id } }
  | { type: "RESET_ALL" };

interface IAppContext {
  lists: Array<IList>;
  reducer: React.Dispatch<ListActions>;
}
