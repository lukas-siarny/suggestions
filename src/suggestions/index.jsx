import React from "react";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import Body from "./Body";

const Suggestions = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  return (
    <>
      <Navigation handleSidebarOpen={() => setSidebarOpen(true)} />
      <Sidebar
        isOpen={sidebarOpen}
        forceRefresh={() => setRefresh(!refresh)}
        handleSidebarClose={() => setSidebarOpen(false)}
      />
      <Body handleSidebarOpen={() => setSidebarOpen(true)} refresh={refresh} />
    </>
  );
};

export default Suggestions;
