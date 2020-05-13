export const required = value => {
  if (value) return undefined;
  return "Feild is required";
};
export const minLengthCreator = minLength => value => {
  if (value.length < minLength)
    return `Введите не меньше  ${minLength}-ух символов`;
  return undefined;
};
