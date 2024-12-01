import { LuTrash2 } from "react-icons/lu";
import Card from "./Card";
import { AddCard } from "./AddButton";
function List() {
  return (
    <li className="flex-shrink-0 block" draggable>
      <div className="w-[272px] max-h-full flex flex-col bg-background-list rounded-xl">
        {/* header */}
        <div className="px-3 pt-3 flex items-center justify-between">
          <span className="text-sm font-semibold pl-2">list title</span>
          <button className="w-fit px-2 py-[7px] rounded-md text-red-600 hover:bg-red-100">
            <LuTrash2 size={14} />
          </button>
        </div>

        {/* cards */}
        <ol className="p-2 flex-1 flex flex-col overflow-y-auto overflow-x-hidden gap-2 list-none">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />  
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ol>

        {/* footer */}
        <div className="">
          <AddCard />
        </div>
      </div>
    </li>
  );
}

export default List;
