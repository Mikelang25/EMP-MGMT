import axios from "axios";

export default {
  getEmployees: function () {
    return axios.get("/api/find/employees");
  },
  updateEmployee: function (employee) {
    return axios.put("/api/employee", employee);
  },
  uploadFile: function (file) {
    return axios.post("/uploadfile", file);
  },
  downloadFile: function (file) {
    return axios.get("/download/" + file);
  },
  createEmployee: function (employee) {
    return axios.post("/api/employee", employee);
  },
  getIssues: function (employee) {
    return axios.get("/api/find/issues/");
  },
  deleteIssue: function (issue) {
    return axios.delete("/api/issue/deleteall/" + issue);
  },
  createIssue: function (issue) {
    return axios.post("/api/issue", issue);
  },
  loginUser: function (info) {
    return axios.post("/api/login", {
      email: info.email,
      password: info.password
    });
  },
  createUser: function (user) {
    return axios.post("/api/signup",user);
  },
  logoutUser: function (user) {
    return axios.get("/logout",user);
  }
};
