
angular
  .module("main", [])
  .controller("mainController", ["$scope", "$http", ($scope, $http) => {
    let loggedIn = false;
    // login 
    $scope.login = () => {
      // take username and password, 
      const data = {
        username: $scope.username,
        password: $scope.password,
        grant_type: "password"
      }
      $http({
        url: "http://localhost:57616/token",
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
      }).then(resp => {
        // console.log(resp)
        // store the token
        if (resp.status == 200) {
          localStorage.setItem("token", resp.data.access_token);
          // console.log(loggedIn);
          loggedIn = true;
          // console.log(loggedIn);
          $scope.loggedIn = loggedIn;
        }
      })
    }
    let Contacts = [];
    //Get Contacts
    /////This isn't working and I can't figure out why not.
    $scope.getContacts = () => {
      console.log("Getting Contacts...");
      let token = localStorage.getItem("token");
      console.log(token);
      $http({
        url: "http://localhost:57616/api/contact",
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": $`Bearer {token}`
        }
      }).then(resp => {
        console.log(resp);

      })
    }
  }
  ]);
