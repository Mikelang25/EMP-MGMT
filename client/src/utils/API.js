import axios from "axios";

export default {
  getEmployees: function () {
    return axios.get("/api/find/employees");
  },
  updateEmployee: function (employee) {
    return axios.put("/api/employee", employee);
  },
  uploadFile: function (file,employee) {
    return axios.post("/uploadfile/" + employee, file);
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
  getIssuesSearch: function (){
    return axios.get("/api/find/issuessearch");
  },
  deleteIssue: function (issue,employee) {
    return axios.delete("/api/issue/deleteall/" + issue + "/" + employee);
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
  },
  findEmployee:function(employee){
    return axios.get("/api/find/employee/" + employee)
  },
  updateIssue: function (issue) {
    return axios.put("/api/accept/issues/" + issue);
  }
};
