import React from "react";
import { reducer as AppReducer } from "./reducers";

const defaultState: IAppContext = {
  lists: [],
  reducer: () => {},
  draggingElement: null,
  setDraggingElement: () => {},
};

export const AppContext = React.createContext<IAppContext>(defaultState);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialState: Array<IList> = [];

  const item = localStorage.getItem("trello-lists");
  const getTasks = item ? JSON.parse(item) : initialState;

  const [draggingElement, setDraggingElement] =
    React.useState<draggingelement>(null);

  const [lists, reducer] = React.useReducer(AppReducer, getTasks);

  React.useEffect(() => {
    localStorage.setItem("trello-lists", JSON.stringify(lists));
  }, [lists]);

  return (
    <AppContext.Provider
      value={{ lists, reducer, draggingElement, setDraggingElement }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
