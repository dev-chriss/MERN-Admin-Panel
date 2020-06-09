import axios from "axios";

const http = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    "Content-type": "application/json"
  }
});

export default {
  auth(url = 'auth') {
    return {
        login: ({email, password}) => http.post(url + '/login', {email, password}),
        register: ({email, name, password}) => http.post(url + '/register', {email, name, password})
    }
  },

  map(url = 'map') {
      const config = {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      return {
          fetchAll: () => http.get(url + '/list', config),
          fetchPagination: (page, limit, name, category) => 
              http.get(url + "?page=" + page + "&limit=" + limit + "&name=" + name + "&category=" + category, config),
          fetchById: id => http.get(url + "/" + id, config),
          create: newRecord => http.post(url, newRecord, config),
          update: (id, updatedRecord) => http.put(url + "/" + id, updatedRecord, config),
          delete: id => http.delete(url + "/" + id, config)
      }
  },

  user(url = 'user') {
      const config = {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      return {
          fetchAll: () => http.get(url + '/list', config),
          fetchPagination: (page, limit, name, email) => 
              http.get(url + "?page=" + page + "&limit=" + limit + "&name=" + name + "&email=" + email, config),
          fetchById: id => http.get(url + "/" + id, config),
          create: newRecord => http.post(url, newRecord, config),
          update: (id, updatedRecord) => http.put(url + "/" + id, updatedRecord, config),
          delete: id => http.delete(url + "/" + id, config)
      }
  }

}