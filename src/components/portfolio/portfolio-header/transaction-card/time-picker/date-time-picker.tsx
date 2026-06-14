import { add, format, set } from "date-fns";
import { Calendar as CalendarIcon, Clock2Icon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group.tsx";

export function DateTimePicker({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date?: Date) => void;
}) {
  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!date) {
      setDate(newDay);
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    setDate(newDateFull);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeString = e.target.value;
    if (!timeString) return;

    const [hours, minutes] = timeString.split(":").map(Number);

    const baseDate = date || new Date();

    const updatedDate = set(baseDate, {
      hours: hours || 0,
      minutes: minutes || 0,
      seconds: 0,
      milliseconds: 0,
    });

    setDate(updatedDate);
  };

  const timeInputValue = date
    ? format(date, "HH:mm")
    : format(new Date(), "HH:mm");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={-250} side="right" className="w-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleSelect(d)}
          disabled={{ after: new Date() }}
          className="p-0"
        />
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="time-from">Time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                onChange={handleTimeChange}
                value={timeInputValue}
                id="time-from"
                type="time"
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  );
}
