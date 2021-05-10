import { SORT_BY_ENUM } from "../config";

/**
 * Zoradi data podla pozadovaneho parametru,
 */
const sorter = (data, sortBy) => {
  if (sortBy === SORT_BY_ENUM.dateNewest) {
    return data.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  if (sortBy === SORT_BY_ENUM.dateOldest) {
    return data.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  const collator = new Intl.Collator("sk", {
    numeric: true,
    sensitivity: "base",
  });

  if (sortBy === SORT_BY_ENUM.firstNameAz) {
    return data.sort((a, b) => {
      return collator.compare(a.firstName, b.firstName);
    });
  }

  if (sortBy === SORT_BY_ENUM.firstNameZa) {
    return data.sort((a, b) => {
      return collator.compare(b.firstName, a.firstName);
    });
  }

  if (sortBy === SORT_BY_ENUM.lastNameAz) {
    return data.sort((a, b) => {
      return collator.compare(a.lastName, b.lastName);
    });
  }

  if (sortBy === SORT_BY_ENUM.lastNameZa) {
    return data.sort((a, b) => {
      return collator.compare(b.lastName, a.lastName);
    });
  }

  return data;
};

export default sorter;
