export function convertToSecJST(time: string): string  {
  const date = new Date(time);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  
  return date.toLocaleString('ja-JP', options);
}

export function convertToDayJST(time: string): string  {
  const date = new Date(time);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  
  return date.toLocaleString('ja-JP', options);
}
