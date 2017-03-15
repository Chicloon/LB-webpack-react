import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';

import Api from 'helpers/api';

class User {
  @observable isLoading = false;
  @observable signedIn = false;
  @observable user = null;

  @action setIsLoading(status) {
    this.isLoading = status;
  }

  @action setSignedIn(status, username) {
    this.signedIn = status;
    this.username = username;
  }

  async createSession(username, password) {
    this.setIsLoading(true);

    const response = await Api.post(
      '/Users/login/',
      { username, password }
    );

    const status = await response.status;

    if (status === 200) {
      const user = await response.json();

      console.log(user);
      localStorage.setItem('token', user.id);
      localStorage.setItem('username', username);

      this.setIsLoading(false);
      this.setSignedIn(true, username);

      browserHistory.push('/');
    } else {
      console.log('error');
    }
  }

  signOut() {
    localStorage.clear();
    this.setSignedIn(false);
  }
}

export default new User();
