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



function writeUserData(userId, masterkey) {
      //console.log("ulla vanthuduchu");
      //email = email.replace(".", ",");
      //password = password.replace(".", ",");
      firebase.database().ref('users/' + userId + '/MasterPassword').set({
            masterkey: masterkey
      });
}


function retrieveData(userId) {
      var starCountRef = firebase.database().ref('users/' + userId + '/MasterPassword');
      let masterkey;
      starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            //console.log("retrieve Data :: ", data["masterkey"]);

            masterkey = data["masterkey"];
      });

      return masterkey;
}

/****************************************************************
 *                Checking the State of User
 ***************************************************************/

firebase.auth().onAuthStateChanged((user) => {
      if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            //console.log(user);
            var uid = user.uid;

            var starCountRef = firebase.database().ref('users/' + uid + '/MasterPassword');
            starCountRef.on('value', (snapshot) => {
                  const data = snapshot.val();
                  //console.log("data : ", data);
                  var check;

                  if (!data)
                        check = true;
                  else
                        check = false;

                  console.log("inside :: ", check);
                  if (check === true) {
                        let key = prompt("Set Your Password .. !!Caution : You cannot change your password after this", "");
                        writeUserData(uid, key);
                        //console.log("key is provided");
                  }
            });

            addButton.addEventListener("click", () => {
                  window.location.assign("./addInfo.html");
            });

            viewButton.addEventListener("click", () => {
                  let key = prompt("Add your Master Key : ", "");
                  let flag = retrieveData(uid);
                  //console.log(uid, key, flag);

                  if (flag === key)
                        window.location.assign("./viewInfo.html");
                  else {
                        alert("The Entered Password is Wrong , Please Try Again Later. Incase you Forgot your password please contact the Administrator");
                        //window.location.assign("./index.html");
                  }
            });

      } else {
            // User is signed out
            // ...
            window.location.assign("./index.html");
      }
});