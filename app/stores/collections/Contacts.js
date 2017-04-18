import { observable, action } from 'mobx';

import Api from 'helpers/api';

class Contacts {
  path = '/Contacts';
  @observable all = [];
  @observable isLoading = false;

  @action async fetchAll() {
    this.isLoading = true;
    const response = await Api.get(this.path);
    const status = await response.status;

    if (status === 200) {
      // const json = await response.json();
      // this.all = await json.data;
      this.all = await response.json();
      this.isLoading = false;
    }
  }

  @action async add(data) {
    const response = await Api.post(this.path, data);
    const status = await response.status;

    if (status === 200) {
      this.fetchAll();
    }
  }

  @action find(contactId) {
    return (
      this.all.slice().filter(
        c => c.id === contactId)[0]
    );
  }

  @action async patch(contactId) {
    this.isLoading = true;
    const response = await Api.patch(`${this.path}/${contactId}`, {
  first_name: "strinasdfasdfg",
 
 });
    const status = await response.status;

    if (status === 200) {
      this.isLoading = false;
      this.fetchAll();
    }
  }

  @action async remove(contactId) {
    this.isLoading = true;
    const response = await Api.delete(`${this.path}/${contactId}`);
    const status = await response.status;

    if (status === 200) {
      this.isLoading = false;
      this.fetchAll();
    }
  }
}

export default new Contacts();
