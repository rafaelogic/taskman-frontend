import * as API from "@/services/Api";

export default {
  getUser(userId) {
    return API.handle.get(`/users/${userId}`);
  },
  getUsers(page) {
    return API.handle.get(`/users/?page=${page}`);
  },
  paginateUsers(link) {
    return API.handle.get(link);
  },
};