import axios from "axios";

export default {
  getEmployees: function () {
    return axios.get("/api/find/employees");
  }
};
