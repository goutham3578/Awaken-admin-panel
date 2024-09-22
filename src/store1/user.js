import React from 'react';
import { makeAutoObservable, toJS } from 'mobx';

class User{
    constructor() {
        makeAutoObservable(this);
      }

      user={};
      setUser(user){
        this.user=user
        localStorage.setItem("User",JSON.stringify(user));
      }
}

export default User;