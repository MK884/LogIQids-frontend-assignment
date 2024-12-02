import { AddList, List } from "@/components";
import { useAppContext } from "@/context";

function Board() {
  const { lists, reducer } = useAppContext();

  const addNewList = (title: string) => {
    if (!title?.trim()?.length) return;

    reducer({
      type: "ADD_LIST",
      payload: { title },
    });
  };

  return (
    <>
      <ol className="overflow-y-hidden flex overflow-x-auto p-3 h-full ">
        <div className="flex gap-3 h-full max-h-full">
          {lists?.map((list) => (
            <List key={list.id} list={list} />
          ))}
          <AddList onAdd={addNewList} />
        </div>
      </ol>
    </>
  );
}

export default Board;
