import { observable, action } from 'mobx';
import io from 'socket.io-client';

import Api from 'helpers/api';

// var urlToChangeStream = 'http://localhost:3000/api/Contacts/change-stream?_format=event-stream';
// var src = new EventSource(urlToChangeStream);
// // src.onmessage = function (e) {
// //   console.log("Пришли данные: " + e.data);
// // };
// src.addEventListener('data', function (msg) {
//   var data = JSON.parse(msg.data);
//   console.log('the data is', data); // the change object
// });

class Contacts {
  path = '/Contacts';
  @observable all = [];
  @observable isLoading = false;

  @observable data = { name: 'name' };
  // urlToChangeStream = 'http://localhost:3000/api/Contacts/change-stream?_format=event-stream';
  // src = new EventSource(this.urlToChangeStream).addEventListener('data',  (msg) => {
  //   var data = JSON.parse(msg.data);
  //   this.data.name = data.target;
  //   console.log('the data is', data); // the change object
  // });
  
  // this.src.addEventListener('data', function (msg) {
  //     var data = JSON.parse(msg.data);
  //     console.log('the data is', data); // the change object
  //   });

  @action async fetchAll() {
    this.isLoading = true;
    const response = await Api.get(this.path);
    const status = await response.status;
    const socket = io();
    
    socket.emit('chat message', 'test message');

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
