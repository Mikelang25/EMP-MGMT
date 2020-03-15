import axios from "axios";

export default {
  getEmployees: function () {
    return axios.get("/api/find/employees");
  },
  updateEmployee:function(employee){
    return axios.put("/api/employee",employee);
  }
};
