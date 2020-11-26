/****************************************************************
 *                DOM Manipulations
 ***************************************************************/
const addButton = document.getElementById("addInfo");
const viewButton = document.getElementById('viewInfo');

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


/****************************************************************
 *                Checking the State of User
 ***************************************************************/

firebase.auth().onAuthStateChanged((user) => {
      if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            console.log(user);
            var uid = user.uid;
            addButton.addEventListener("click", () => {
                  window.location.assign("./addInfo.html");
            });

            viewButton.addEventListener("click", () => {
                  window.location.assign("./viewInfo.html");
            });

      } else {
            // User is signed out
            // ...
            window.location.assign("./index.html");
      }
});