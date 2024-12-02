import React from "react";
import { RiPencilLine } from "react-icons/ri";
import Dialog from "./Dialog";
import { FaRegCreditCard } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { LuText } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { useAppContext } from "@/context";

function Card({
  card,
  listId,
  listTitle,
}: {
  card: ICard;
  listTitle: string;
  listId: Id;
}) {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const dategRef = React.useRef<HTMLInputElement>(null);
  const { reducer } = useAppContext();

  const [title, setTitle] = React.useState<string>(card.title || "");
  const [isTitleEditing, setisTitleEditing] = React.useState<boolean>(false);

  const [date, setDate] = React.useState<string>(card?.duDate || "");

  const [description, setDescription] = React.useState<string>(
    card?.description || ""
  );
  const [isDescriptionEditing, setisDescriptionEditing] =
    React.useState<boolean>(false);

  const openDialog = () => dialogRef?.current?.showModal();
  const closeDialog = () => dialogRef?.current?.close();

  const handleClick = (e: Event) => {
    if (dialogRef?.current && e.target === dialogRef.current) {
      closeDialog();
    }
  };

  const openDate = () => {
    dategRef?.current?.showPicker();
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  const foramteDate = (date: string) => {
    if (!date) return date;
    const newDate = new Date(date);
    return newDate.toLocaleString("en-GB", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const foramtedDate = foramteDate(date);

  // date, title, description is changed?
  const isChanged =
    title.trim() !== card.title ||
    description.trim() !== (card?.description ?? "") ||
    date !== (card?.duDate ?? "");

  const onDeleteCard = () => {
    const isChecked = confirm(`Are you sure you want to delete this card?`);
    if (!isChecked) return;

    reducer({
      type: "REMOVE_CARD",
      payload: {
        cardId: card.id,
        listId,
      },
    });
  };

  const handleCardDialog = () => {
    if (isChanged) {
      const newCard: Partial<ICard> = {
        ...card,
      };

      // only updated fields
      if (title.trim() !== card.title) newCard.title = title;
      if (description.trim() !== (card?.description ?? ""))
        newCard.description = description;
      if (date !== (card?.duDate ?? "")) newCard.duDate = date;

      reducer({
        type: "UPDATE_CARD",
        payload: {
          card: newCard,
          listId,
        },
      });
    }

    closeDialog();
  };

  return (
    <>
      <li
        className="isolate relative shadow-sm cursor-pointer"
        draggable
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openDialog}
      >
        <div className="bg-background-card flex-1 text-sm px-3 py-2 h-[42px] flex items-center rounded-lg border-2 hover:border-background-primary">
          <div className="flex items-center justify-between w-full">
            <span>{card.title}</span>
            {isHovered && (
              <div className="w-fit px-2 py-[7px] rounded-full hover:bg-black/10">
                <RiPencilLine />
              </div>
            )}
          </div>
        </div>
      </li>

      <Dialog ref={dialogRef}>
        <div className="px-6 py-4 w-full flex flex-col gap-4 bg-background-list">
          {/* title */}
          <div className="flex gap-2 w-full items-start">
            <div className="text-slate-500">
              <FaRegCreditCard size={20} />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Enter list name..."
                className={`w-full pl-2 text-md py-1 rounded-sm outline-background-primary ${
                  !isTitleEditing
                    ? "bg-transparent cursor-pointer"
                    : "bg-white cursor-text"
                }`}
                value={title}
                readOnly={!isTitleEditing}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => setisTitleEditing(true)}
                onBlur={() => setisTitleEditing(false)}
              />
              <span className="text-sm text-slate-500">
                in list <b className="font-bold uppercase">{listTitle}</b>
              </span>
            </div>
          </div>

          {/* duedate */}
          <div className="flex gap-2 w-full items-start">
            <div className="text-slate-500">
              <IoEyeOutline size={20} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="due"
                className="text-sm text-slate-600 font-semibold w-fit"
              >
                Due Date
              </label>
              <span
                onClick={openDate}
                className="text-sm px-2 text-md py-1 rounded-sm hover:bg-slate-700/20 bg-slate-700/10 cursor-pointer w-max"
              >
                {foramtedDate || "Selecte due date"}
              </span>
              <input
                type="datetime-local"
                ref={dategRef}
                id="due"
                style={{ visibility: "hidden" }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* description */}
          <div className="flex gap-2 w-full items-start">
            <div className="text-slate-500">
              <LuText size={20} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="desc"
                className="text-sm font-semibold text-slate-600 w-fit"
              >
                Description
              </label>
              <textarea
                id="desc"
                rows={5}
                placeholder="Add more detailed description..."
                className={`w-full pl-2 text-md py-1 rounded-sm outline-background-primary resize-none  ${
                  !isDescriptionEditing
                    ? "hover:bg-slate-700/20 bg-slate-700/10 cursor-pointer"
                    : "bg-white"
                }`}
                value={description}
                readOnly={!isDescriptionEditing}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => setisDescriptionEditing(true)}
                onBlur={() => setisDescriptionEditing(false)}
              />
            </div>
          </div>

          {/* actions */}
          <div className="flex gap-2 items-center w-full">
            <button
              onClick={handleCardDialog}
              className="flex-1 flex items-center justify-center gap-2 bg-background-primary hover:bg-background-primary/95 text-white text-md py-2 rounded-lg"
            >
              {isChanged ? "save" : "back"}
            </button>
            <button
              onClick={onDeleteCard}
              className="flex-1 text-red-600 font-semibold flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white text-md py-2 rounded-lg"
            >
              <LuTrash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Card;
