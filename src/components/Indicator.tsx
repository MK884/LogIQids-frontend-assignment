import React from "react";

function Indicator({ onDrop }: { onDrop: () => void }) {
  const [showIndicator, setShowIndicator] = React.useState<boolean>(false);
  return (
    <div
      className={`w-full  rounded-lg  transition-all duration-300 my-1 ${
        showIndicator ? "h-[42px] bg-black/10" : "h-[2px] bg-transparent"
      }`}
      onDragEnter={() => setShowIndicator(true)}
      onDragLeave={() => setShowIndicator(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        onDrop();
        setShowIndicator(false);
      }}
    />
  );
}

export default Indicator;
