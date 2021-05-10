import { darken } from "polished";

const customDarken = (amount, color) => {
  if (color === "transparent") {
    return `rgba(0, 0, 0, ${amount})`;
  }
  return darken(amount, color);
};

export default customDarken;
