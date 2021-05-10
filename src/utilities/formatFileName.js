/**
 * Vrati skrateny nazov suboru s typom suboru na kocni
 */
export const formatFileName = (file, length) => {
  if (file.type) {
    const type = file.type ? file.type.split("/")[1] : "";
    const lastDot = file.name.lastIndexOf(".");
    let newName = file.name.substring(0, lastDot);

    newName =
      newName.length > length ? newName.slice(0, length + 5) + "..." : newName;
    newName = `${newName}.${type}`;
    return newName;
  }
  return file.name || "-";
};
