
/****************************************************************
 *                DOM Manipulations
 ***************************************************************/

const sendButton = document.getElementById("send");
const website = document.getElementById("website");
const email = document.getElementById("email");
const password = document.getElementById("password");


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
 *                POST Data into the Database
 ***************************************************************/

function writeUserData(userId, websiteName, email, password) {
      //console.log("ulla vanthuduchu");
      //email = email.replace(".", ",");
      //password = password.replace(".", ",");
      firebase.database().ref('users/' + userId + '/' + websiteName).set({
            website: websiteName,
            email: email,
            password: password
      });

      /*
      var starCountRef = firebase.database().ref('users/' + userId);
      starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log("retrieve Data :: ", data);
      });
      */
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

            sendButton.addEventListener('submit', (e) => {
                  e.preventDefault();
                  console.log("fun :: ", website.value, email.value, password.value);
                  writeUserData(uid, website.value, email.value, password.value);
                  website.value = "";
                  email.value = "";
                  password.value = "";
            });

      } else {
            // User is signed out
            // ...
            //console.log("afdafassfggfagfgagf");
            window.location.assign("./index.html");
      }
});





