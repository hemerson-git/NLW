// 18:00 -> ["18", "00"] -> [18, 00]

export function convertHourStringToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number);
  const minutesAmout = hours * 60 + minutes;

  return minutesAmout;
}
