import axios from "axios";

export default {
  getEmployees: function () {
    return axios.get("/api/find/employees");
  },
  updateEmployee:function(employee){
    return axios.put("/api/employee",employee);
  },
  uploadFile:function(file){
    return axios.post("/uploadfile",file);
  },
  createEmployee:function(employee){
    return axios.post("/api/employee",employee);
  }
};
