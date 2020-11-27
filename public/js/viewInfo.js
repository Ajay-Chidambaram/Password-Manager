
const table = document.getElementById("myTable");

/****************************************************************
 *                Firebase Config Keys
 ***************************************************************/

var firebaseConfig = {
      apiKey: "AIzaSyBZ5VFxzUYJRuS0GDg0N8Rds4GngLXQ0O8",
      authDomain: "password-manager-6a0f5.firebaseapp.com",
      databaseURL: "https://password-manager-6a0f5.firebaseio.com",
      projectId: "password-manager-6a0f5",
      storageBucket: "password-manager-6a0f5.appspot.com",
      messagingSenderId: "566976289133",
      appId: "1:566976289133:web:0b6461028ab6841e3ea264",
      measurementId: "G-4XGTX3348M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function retrieveData(userId) {
      var starCountRef = firebase.database().ref('users/' + userId);
      starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log("retrieve Data :: ", data);

            //console.log(Object.keys(data).length);
            /*
            for (let x in data) {
                  var row = table.insertRow(1);
                  var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1);
                  var cell3 = row.insertCell(2);
                  var cell4 = row.insertCell(3);
                  cell1.innerHTML = x;
                  cell2.innerHTML = data[x].email;
                  cell3.innerHTML = data[x].password;
            }
            */
            let table = document.getElementById("myTable");
            let count = 1;
            for (let x in data) {
                  var row = document.createElement("tr");
                  var cell0 = document.createElement("td");
                  var cell1 = document.createElement("td");
                  var cell2 = document.createElement("td");
                  var cell3 = document.createElement("td");
                  var cell4 = document.createElement("td");

                  cell0.innerHTML = String(count);
                  cell1.innerHTML = x;
                  cell2.innerHTML = data[x].email;
                  cell3.innerHTML = data[x].password;


                  let eye = document.createElement("i");
                  cell3.id = count + "s";
                  eye.id = count;
                  eye.setAttribute("class", "far fa-eye");
                  let len = cell3.innerHTML.length;

                  cell3.innerHTML = "*".repeat(len);

                  eye.onmousedown = function () { mousedown(this.id, data[x].password) };
                  eye.onmouseup = function () { mouseup(this.id, len) };
                  count = count + 1;
                  cell4.appendChild(eye);
                  cell4.style = "border:0;display:flex;align-items:center;justify-content:center;"



                  row.appendChild(cell0);
                  row.appendChild(cell1);
                  row.appendChild(cell2);
                  row.appendChild(cell3);
                  row.appendChild(cell4);

                  table.appendChild(row);
            }
      });
}

/****************************************************************
 *                Checking the State of User
 ***************************************************************/

firebase.auth().onAuthStateChanged((user) => {
      if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            // ...
            console.log("uid :: ", uid);
            retrieveData(uid);

      } else {
            // User is signed out
            // ...
            window.location.assign("./index.html");
      }
});


function mouseup(id, len) {
      console.log("visiblity mouse up", id);

      let password = document.getElementById(id + "s");
      console.log(password.innerHTML);
      password.innerHTML = "*".repeat(len);
      // toggle the eye slash icon

      let eye = document.getElementById(id);
}


function mousedown(id, pass) {
      console.log("visiblity mouse down", id);

      let password = document.getElementById(id + "s");
      console.log(password.innerHTML);
      password.innerHTML = pass;
      // toggle the eye slash icon

}