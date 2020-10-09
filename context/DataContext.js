import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

const DataContextHOC = (props) => {
  const [filterusers, setFilterUsers] = useState([]);
  const [filterEvents, setFilterEvents] = useState([]);
  const [filterMessages, setFilterMessages] = useState([]);
  const [filterCirculars, setFilterCirculars] = useState([]);
  const [filterOrganisations, setFilterOrganisations] = useState([]);
  const [filterLectItems, setFilterLectItems] = useState([]);

  return (
    <DataContext.Provider
      value={{
        filterusers,
        setFilterUsers,
        filterEvents,
        setFilterEvents,
        filterMessages,
        setFilterMessages,
        filterCirculars,
        setFilterCirculars,
        filterOrganisations,
        setFilterOrganisations,
        filterLectItems,
        setFilterLectItems,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
export default DataContextHOC;
