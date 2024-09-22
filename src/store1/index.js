import React from "react";
import Leads from "./leads";
import User from "./user"

class RootStore {
  constructor() {
    this.Leads = new Leads(this);
    this.User=new User(this);
   
  }
}
const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);