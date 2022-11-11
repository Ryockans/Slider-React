export const composeClasses = (...args: String[]) => {
  return args.join(' + ');
}