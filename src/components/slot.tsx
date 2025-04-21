import { Dispatch, FC, SetStateAction } from "react";
import type { SlotOptional } from "./dialog";

export const SlotItem: FC<{
  index: number;
  reserved: string;
  slot: SlotOptional;
  onClick: Dispatch<SetStateAction<string>>;
}> = ({ reserved, slot, onClick, index }) => {
  const isSelected = slot?.id === reserved;
  const isReserved = slot?.reserved;
  const isLast = index === 3;
  return (
    <div className={"p-2" + isLast ? " border-r" : ""}>
      <button
        onClick={() => {
          if (slot?.reserved) {
            return;
          }
          if (!slot?.id) {
            return
          }
          onClick(slot?.id);
        }}
        style={{
          textDecorationLine: slot?.reserved ? "line-through" : "none",
          color: isSelected ? "forestgreen" : isReserved ? "black" : undefined,
        }}
        className="text-blue-500 hover:bg-blue-50 px-2 py-1 rounded w-full"
      >
        {slot ? String(index + 9).padStart(2, "0") + ":00" : "-"}
      </button>
    </div>
  );
};
