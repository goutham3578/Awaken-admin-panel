import React from "react";
import Leads from "./leads";

class RootStore {
  constructor() {
    this.Leads = new Leads(this);
   
  }
}
const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);