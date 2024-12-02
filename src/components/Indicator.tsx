import { useAppContext } from "@/context";
import React from "react";

function Indicator({
  onDrop,
  h,
  w,
}: {
  onDrop: () => void;
  h?: number;
  w?: number;
}) {
  const [showIndicator, setShowIndicator] = React.useState<boolean>(false);

  const { draggingElement } = useAppContext();

  return (
    <div
      className={`w-full flex-shrink-0 rounded-lg  transition-all duration-300 my-1 ${
        showIndicator ? "bg-black/10" : " bg-transparent"
      }`}
      style={{
        height: showIndicator ? (h ? h : 42) : 2,
        width: w,
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        if ("CARD" === draggingElement?.type) {
          setShowIndicator(true);
        }
      }}
      onDragLeave={() => setShowIndicator(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        if (draggingElement?.type === "CARD") {
          onDrop();
        }
        setShowIndicator(false);
      }}
    />
  );
}

export default Indicator;

export function ListIndicator({
  onDrop,
  h,
  w,
}: {
  onDrop: () => void;
  h?: number;
  w?: number;
}) {
  const { draggingElement } = useAppContext();

  const [showIndicator, setShowIndicator] = React.useState<boolean>(false);
  return (
    <div
      className={`flex-shrink-0 h-full rounded-lg  transition-all duration-300 my-1 ${
        showIndicator ? "bg-black/10" : " bg-transparent"
      }`}
      style={{
        height: h,
        width: showIndicator ? (w ? w : 272) : 4,
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => {
        e.preventDefault();
        if ("LIST" === draggingElement?.type) {
          setShowIndicator(true);
        }
      }}
      onDrop={() => {
        if (draggingElement?.type === "LIST") {
          onDrop();
        }
        setShowIndicator(false);
      }}
      onDragLeave={() => setShowIndicator(false)}
    />
  );
}
