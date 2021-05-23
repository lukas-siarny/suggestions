export const COUNTRIES_LIST_DEFAULT = "Krajina";
export const LIST_ERROR = { label: "Nepodarilo sa načítať zoznam položiek" };

export const IMAGE = {
  MAX_SIZE: 20971520,
  MAX_SIZE_SHORT: "20 MB",
  SUPPORTED_TYPES: ["image/jpeg", "image/png"],
  SUPPORTED_TYPES_SHORT: ".png a .jpeg",
};

export const SORT_BY_ENUM = {
  dateNewest: { label: "Najnovšie", value: "date" },
  dateOldest: { label: "Najstaršie", value: "-date" },
  firstNameAz: { label: "Meno (A-Z)", value: "firstName" },
  firstNameZa: { label: "Meno (Z-A)", value: "-firstName" },
  lastNameAz: { label: "Priezvisko (A-Z)", value: "lastName" },
  lastNameZa: { label: "Priezvisko (Z-A)", value: "-lastName" },
};

export const STATUS_ENUM = {
  IDLE: "idle",
  LOADING: "loading",
  FULFILLED: "fulfilled",
  ERROR: "error",
  NOT_FOUND: "notfound",
};

export const DEFAULT_LIMIT = 15;
export const DEFAULT_PAGE = 1;

export const THEME_TRANSITION = "150ms ease-out";
