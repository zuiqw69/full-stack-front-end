import axios from "axios";
const url = "http://localhost:3001/";

export class ApiClient {

  constructor(token,logoutHandler){
    this.token = token;
    this.logoutHandler = logoutHandler;
  }

  apiCall(method, url, data) {
    console.log(url)

    return axios({
      method,
      url,
      data,
    }).catch((error) => {
      throw error;
    });
  }

  authenticatedCall(method, url, data) {
    return axios({
      method,
      url,
      headers: {
        authorization: this.token
      },
      data,
    }).catch((error) => {
      if(error.response.status == 403){
        this.logoutHandler();
        return Promise.reject;
      } else{

      throw error;
      }
    });
  }

  login(username,password){
    console.log("username",username)
    console.log("password",password)
    return this.apiCall("post",`${url}auth`, {
      userName: username,
      password: password
    })
  }

  getEvents() {
    return this.authenticatedCall("get", url);
  }

  addEvent(name, price) {
    return this.authenticatedCall("post", url, { name, price });
  }

  removeEvent(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateEvent(id, name, price) {
    return this.authenticatedCall("put", `${url}${id}`, { name, price });
  }
}