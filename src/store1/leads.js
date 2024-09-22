import React from 'react';
import { makeAutoObservable, toJS } from 'mobx';
import { apiGet } from '../api/api_methods';

class Leads {
  constructor() {
    makeAutoObservable(this);
  }
  completedLeads = [];
  newLeads = [];
  agents = [];
  pendingLeads = [];
  loading = false;
  allLeads = [];
  counts = {};
  setCounts(counts) {
    this.counts = counts;
  }
  setAgents(agents) {
    this.agents = agents;
  }
  setAllLeads(leads) {
    this.allLeads = leads;
  }
  setCompletedLeads(leads) {
    this.completedLeads = leads;
  }
  setNewLeads(leads) {
    this.newLeads = leads;
  }
  setPendingLeads(leads) {
    this.pendingLeads = leads;
  }
  setLoading(value) {
    this.loading = value ?? false;
  }

  async getLeads(status) {
    this.setLoading(true);
    const response = await apiGet(`/form/get-leads?status=${status}`);
    this.setCounts(response?.body?.count);
    this.setAgents(response?.body?.agents);
    if (response.status === 200) {
      if (status === 'new') {
        this.setNewLeads(response?.body?.data);
      } else if (status === 'approved') {
        this.setCompletedLeads(response?.body?.data);
      } else if (status == 'pending') {
        this.setPendingLeads(response?.body?.data);
      } else {
        this.setAllLeads(response?.body?.data);
      }
      this.setLoading(false);
    } else {
      alert('somethin gwent wrong');
    }
  }
}

export default Leads;
