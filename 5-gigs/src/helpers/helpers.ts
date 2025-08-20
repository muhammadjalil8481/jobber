import { BadRequestError } from "@muhammadjalil8481/jobber-shared";

export function parseDeliveryTime(value: string): number {
  const [num, unit] = value.split(" ");
  const n = parseInt(num, 10);
  if (!num || !unit)
    throw new BadRequestError(
      "Incorrect delivery time",
      "helpers.ts/parseDeliveryTime()"
    );
  if (unit.startsWith("minute")) return n;
  if (unit.startsWith("hour")) return n * 60;
  if (unit.startsWith("day")) return n * 24 * 60;

  return n; // fallback (treat as minutes)
}
