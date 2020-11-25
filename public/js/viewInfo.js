
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

            for (let x in data) {
                  var row = table.insertRow(1);
                  var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1);
                  var cell3 = row.insertCell(2);
                  cell1.innerHTML = x;
                  cell2.innerHTML = data[x].email;
                  cell3.innerHTML = data[x].password;
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
