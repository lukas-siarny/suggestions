import React from "react";

const light = {
  backgroundColor: "#f7f7f7",
  backgroundSecondary: "#fff",
  fontFamily: `"Roboto", sans-serif`,
  fontColor: "#333333",
  fontColorLight: "#999999",
  colorAccent: "#06afee",
  colorAccentDark: "#0075a0",
  colorError: "#d72e65",
  colorSuccess: "#42ba96",
  divider: "#ddd",
};

const dark = {
  ...light,
  backgroundColor: "#393939",
  backgroundSecondary: "#444444",
  fontColor: "#fff",
  divider: "#272727",
};

export const ThemeContext = React.createContext(light);

const Theme = ({ children }) => {
  const localStorageLightMode = localStorage.getItem("lightMode");
  const [lightTheme, setLightTheme] = React.useState(
    localStorageLightMode === "enabled" || !localStorageLightMode ? true : false
  );

  const changeTheme = () => {
    setLightTheme(!lightTheme);

    if (!lightTheme) {
      localStorage.setItem("lightMode", "enabled");
    } else {
      localStorage.setItem("lightMode", "disabled");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: lightTheme ? light : dark,
        changeTheme,
        lightTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default Theme;
