// 1080 -> 18:00

export function convertMinutesToHourString(totalMinutes: number) {
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");

  const parsedString = `${hours}:${minutes}`;

  return parsedString;
}
