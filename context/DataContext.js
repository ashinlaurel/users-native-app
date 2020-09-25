import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

const DataContextHOC = (props) => {
  const [filterusers, setFilterUsers] = useState([]);
  const [filterEvents, setFilterEvents] = useState([]);

  return (
    <DataContext.Provider
      value={{ filterusers, setFilterUsers, filterEvents, setFilterEvents }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
export default DataContextHOC;
