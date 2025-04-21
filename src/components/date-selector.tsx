"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const DateSelector = () => {
  const params = useSearchParams();
  const job = params.get("job");
  const date = params.get("date");
  const router = useRouter();
  const minDate = new Date();
  const min =
    minDate.getFullYear() +
    "-" +
    (minDate.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    minDate.getDate();
  const valueDate = date ? new Date(Number(date)) : undefined;
  const value = valueDate
    ? valueDate.getFullYear() +
      "-" +
      (valueDate.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      valueDate.getDate()
    : undefined;
  return (
    <>
      <input
        aria-label="Select a date"
        onChange={(event) => {
          const { value } = event.target;
          if (!value) {
            const params = new URLSearchParams();
            if (job) {
              params.append("job", job);
            }
            return router.push("/?" + params.toString());
          }
          const values = event.target.value.split("-");
          const date = new Date();
          date.setFullYear(Number(values[0]));
          date.setMonth(Number(values[1]) - 1);
          date.setDate(Number(values[2]));
          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);
          const params = new URLSearchParams();
          if (job) {
            params.append("job", job);
          }
          params.append("date", date.getTime().toString());
          router.push("/?" + params.toString());
        }}
        className="bg-emerald-400/50 rounded-md flex items-center p-2 px-4 cursor-pointer"
        type="date"
        id="availability"
        name="availability-start"
        value={value}
        min={min}
      />
    </>
  );
};
