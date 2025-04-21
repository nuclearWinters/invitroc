import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Book } from "lucide-react";
import { useState } from "react";
import { SlotItem } from "./slot";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { addReservation, getSlots } from "@/lib/services";

const today = new Date();
const todayPlusOne = new Date(today);
todayPlusOne.setDate(todayPlusOne.getDate() + 1);
const todayPlusTwo = new Date(today);
todayPlusTwo.setDate(todayPlusOne.getDate() + 2);
const todayPlusThree = new Date(today);
todayPlusThree.setDate(todayPlusOne.getDate() + 3);
const dates = [today, todayPlusOne, todayPlusTwo, todayPlusThree];

export const formatDate = (date: Date) => {
  return `${date.getDate()} ${date.toLocaleString("es-ES", {
    month: "short",
  })}`;
};

const formatDayName = (date: Date) => {
  return `${date.toLocaleString("es-ES", {
    weekday: "long",
  })}`;
};

export interface Slot {
  id: string;
  reserved: boolean;
}

export type SlotOptional = Slot | null;

export type SlotSet = [SlotOptional, SlotOptional, SlotOptional, SlotOptional];

export function DialogDemo({ name }: { name: string }) {
  const queryClient = useQueryClient();
  const { data: slots } = useSuspenseQuery({
    queryKey: ["slots"],
    queryFn: () => getSlots(),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (slotId: string) => addReservation(slotId),
    onSuccess: (result) => {
      queryClient.setQueryData(["slots"], () => result);
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
    onError: (error) => {
      alert(error.message);
    },
    onSettled: () => {
      setReserved("");
    },
  });
  const timeSlots: SlotSet[] = new Array(12)
    .fill(null)
    .map(() => [null, null, null, null]);
  for (const slot of slots) {
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    const dateIndex = Math.floor(
      (slot.start_time.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    const timeIndex = slot.start_time.getHours() - 9;
    const day = timeSlots[timeIndex];
    if (day) {
      day[dateIndex] = { id: slot.id, reserved: slot.reserved };
    } else {
      const days: SlotSet = [null, null, null, null];
      days[dateIndex] = { id: slot.id, reserved: slot.reserved };
      timeSlots[timeIndex] = days;
    }
  }
  const [reserved, setReserved] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-2 border rounded-md px-4 py-2 bg-white m-auto mt-4 mb-4"
          variant="outline"
          aria-label="Open appointment booking dialog"
        >
          Book Appointment
          <Book className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        role="dialog"
      >
        <DialogHeader>
          <DialogTitle>Select a time slot</DialogTitle>
          <DialogDescription>
            Doctor: {name}
          </DialogDescription>
        </DialogHeader>
        <div className="border-t">
          <div className="grid grid-cols-4 text-center border-b">
            {dates.map((date, index) => (
              <div key={date.getTime()} className="p-2 border-r">
                <div className="font-medium">
                  {index === 0 ? "Today" : formatDayName(date)}
                </div>
                <div className="text-sm text-gray-500">{formatDate(date)}</div>
              </div>
            ))}
          </div>
          {timeSlots.map((slot, indexParent) => {
            return (
              <div key={indexParent} className="grid grid-cols-4 text-center">
                {slot?.map((slot, index) => (
                  <SlotItem
                    key={slot?.id ?? index}
                    index={indexParent}
                    onClick={setReserved}
                    slot={slot}
                    reserved={reserved}
                    aria-label={
                      slot
                        ? `Time slot at ${indexParent + 9}:00 ${
                            slot.reserved ? "(Reserved)" : "(Available)"
                          }`
                        : "Unavailable time slot"
                    }
                  />
                ))}
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={!reserved || isPending}
              onClick={() => {
                mutate(reserved);
              }}
              type="submit"
              aria-label="Save selected time slot"
            >
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
