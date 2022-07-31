export function trunc(text, length) {
  return text.length > length
    ? text.slice(0, length > 3 ? length - 3 : length) + "..."
    : text;
}
