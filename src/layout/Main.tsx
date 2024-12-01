import { GrPowerReset } from "react-icons/gr";
import { Board } from "@/components";

function Main() {
  return (
    <main className="h-full overflow-hidden flex flex-col bg-gradient w-dvw">
      {/* board header */}
      <div className="bg-black/30 w-dvw backdrop-blur-sm py-3 px-4 flex items-center justify-between">
        <span className="text-md font-semibold text-white whitespace-nowrap">
          Trello board
        </span>
        <button className="group hover:bg-red-600 bg-white hover:border-red-700 px-4 py-1 rounded-lg border border-slate-500 active:scale-95">
          <div className="flex items-center justify-center gap-2 ">
            <div className="text-red-600 group-hover:text-white">
              <GrPowerReset size={14} />
            </div>
            <div>
              <span className="text-md tracking-wider font-semibold text-red-600 group-hover:text-white">
                Reset
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* board */}

      <Board />
    </main>
  );
}

export default Main;
