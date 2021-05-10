import { IMAGE } from "../config";

// onLoadFiles frontend validacia
export const validateImage = (file) => {
  let errorMassage;

  if (
    file.size >= IMAGE.MAX_SIZE ||
    IMAGE.SUPPORTED_TYPES.every((st) => st !== file.type)
  ) {
    errorMassage = `Povolené sú len ${IMAGE.SUPPORTED_TYPES_SHORT} súbory do veľkosti ${IMAGE.MAX_SIZE_SHORT}.`;
    return errorMassage;
  }

  return "";
};
