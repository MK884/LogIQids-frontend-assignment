import { AddList, List } from "@/components";

function Board() {
  return (
    <ol className="overflow-y-hidden flex overflow-x-auto p-3 h-full ">
      <div className="flex gap-3 h-full max-h-full">
        <List />
        <List />
        <AddList />
      </div>
    </ol>
  );
}

export default Board;
