import axios from "axios";

export default {
  // logs in user
  login: function(loginInfo) {
    return axios.post("/api/users/login", loginInfo);
  },

  // signs up user, then logs them in
  signup: function(signupInfo) {
    return axios.post("/api/users/signup", signupInfo);
  },

  // checks to see if user is logged in, then returns the user
  isLoggedIn: function() {
    return axios.get("/api/users/dashboard");
  },

  // checks to see if the user is logged in and and admin, then returns the user
  isAdmin: function() {
    return axios.get("/api/users/logout")
  },

  // logs out the user
  logout: function() {
    return axios.get("/api/users/logout")
  },

  saveVehicle: function(vehicleinfo){
      return axios.post("/api/users/vehicle",vehicleinfo)
  },
  getVehicles: function(){
    return axios.get("/api/users/vehicle")
  },

  deleteVehicles: function(id) {
    return axios.delete("/api/users/vehicle/" + id);
  },

  updateVehicles: function(id, body) {
    return axios.put("/api/users/vehicle/" + id, body);
  },

  statsVehicle: function (from, end) {
    return axios.get("/api/users/stats", { from, end });
  }
  
  };