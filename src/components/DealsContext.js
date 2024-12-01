import React, { createContext, useState } from "react";

export const DealsContext = createContext();

export const DealsProvider = ({ children }) => {
  const [deals, setDeals] = useState([]);

  return (
    <DealsContext.Provider value={{ deals, setDeals }}>
      {children}
    </DealsContext.Provider>
  );
};
