import { useContext } from "react";
import { FilterContext } from "../context/FilterContext";


export const useFilter = () => {
  const context = useContext(FilterContext);

  if (context === undefined)
    throw new Error("The context must be used within a FilterProvider");

  return context;
};
