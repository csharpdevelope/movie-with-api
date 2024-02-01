export function getDateUtils(date: string) {
  const currentFormatDate = new Date(date);
  return changeDay(currentFormatDate.getMonth() + 1) + "/" + changeDay(currentFormatDate.getDate()) + "/" + currentFormatDate.getFullYear();
}

function changeDay(num: number) {
  if (num >= 10)
    return num;
  return "0" + num;
}

export function getFullYear(date?: string) {
  if (!date) return 0;
  const currentDate = new Date(date);

  if (isNaN(currentDate.getTime())) {
    console.error(`Invalid date format: ${date}`);
    return 0;
  }
  return currentDate.getFullYear();
}

export function getHourMinutes(runtime: number) {
  const hour = Math.floor(runtime / 60);
  if (hour === 0)
    return runtime + "min";
  const minutes = runtime - hour * 60;
  if (minutes === 0)
    return hour + "h";
  return hour + "h " + minutes + "min"
}

export function getDateFormat(date: string) {
  const formating = new Date(date); // Assuming you have a Date object

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate: string = new Intl.DateTimeFormat('en-US', options).format(formating);
  return formattedDate;
}

export function getDifferAge(date: string, lastDate: string) {
  const birthDay = new Date(date);
  const lastOrDeathDay = new Date(lastDate);
  let timeDiff = Math.abs(lastOrDeathDay.getTime() - birthDay.getTime());
  let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
  return age + " years old"
}