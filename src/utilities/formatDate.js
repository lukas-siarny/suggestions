import { format, zonedTimeToUtc } from "date-fns-tz";

/**
 * Vrati datum a cas v tvare d-M-yyyy HH:mm,
 */
const formatDate = (d) => {
  if (d) {
    const utcDate = zonedTimeToUtc(d, "Europe/Bratislava");
    const newDate = format(utcDate, "d.M.yyyy HH:mm");

    return newDate;
  }

  return "-";
};

export default formatDate;
