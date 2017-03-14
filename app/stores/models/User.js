import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';

import Api from 'helpers/api';

class User {
  @observable isLoading = false;

  @action setIsLoading(status) { 
    this.isLoading = status;
  }

  async createSession(email, password) {
    this.setIsLoading(true);

    const response = await Api.post(
      '/Users/login/',
      { email, password }
    );

    const status = await response.status;

    if (status === 200) {
      const user = await response.json();

      console.log(user);
      localStorage.setItem('token', user.id);
      localStorage.setItem('email', email);

      this.setIsLoading(false);

      // browserHistory.push('/');
    } else {
      console.log('error');
    }
  }
}

export default new User();
