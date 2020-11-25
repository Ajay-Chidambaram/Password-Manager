
// Terminal Command
// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
const signupEmail = document.getElementById('signup_id');
const signupPassword = document.getElementById('signup_pass');
const signinEmail = document.getElementById("signin_id");
const signinPassword = document.getElementById("signin_pass");
const signInButton = document.getElementById("signin_button");
const signUpButton = document.getElementById('signup_button');


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


var uiConfig = {
      signInFlow: 'popup',

      signInSuccessUrl: "./home.html",

      signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            {
                  provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                  scopes: [
                        'https://www.googleapis.com/auth/contacts.readonly'
                  ],
                  customParameters: {
                        // Forces account selection even when one account
                        // is available.
                        prompt: 'select_account'
                  }
            },
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: '<your-tos-url>',
      // Privacy policy url/callback.
      privacyPolicyUrl: function () {
            window.location.assign('<your-privacy-policy-url>');
      }
};


// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);




const auth = firebase.auth();

// Get a reference to the database service


const signInWithEmailFunction = () => {
      const email = signinEmail.value;
      const password = signinPassword.value;
      console.log(`Email = ${email} , Password = ${password}`);

      auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                  console.log("Sign In User Details ", user)
                  console.log(firebase.auth().currentUser.uid);
                  writeUserData("hello world", "ajay", "silambu.ajayk@gmail.com", imageUrl);
                  window.location.assign('./success.html');
            })
            .catch((error) => {
                  alert(error.code, "\n", error.message);
            });
}

const signUpWithEmailFunction = () => {
      const email = signupEmail.value;
      const password = signupPassword.value;
      console.log(`Email = ${email} , Password = ${password}`);

      auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                  console.log("Sign Up User Details ", user)
            })
            .catch((error) => {
                  alert(error.code, "\n", error.message);
            })
}
/*
var email = "chidambaramk.27@gmail.com";
var password = "ronaldo@1234";

firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
            // Signed in
            // ...
            console.log(user);
      })
      .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ..
      });


firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
            // Signed in
            // ...
            console.log("user details : ", user);
      })
      .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
      });




function action() {
      const FacebookAuth =
            new firebase.auth.FacebookAuthProvider();

      // using the object we will authenticate the user.

      firebase.auth().signInWithPopup(FacebookAuth);
}

*/

signInButton.addEventListener("click", signInWithEmailFunction);
signUpButton.addEventListener("click", signUpWithEmailFunction);


/*

const database = firebase.database();

function writeUserData(userId, name, email, imageUrl) {
      console.log("ulla vanthuduchu");
      firebase.database().ref('users/' + userId).set({
            username: name,
            email: email,
            profile_picture: imageUrl
      });
}

var imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png";
*/

firebase.auth().signOut().then(function () {
      // Sign-out successful.
      console.log("logged outttt");
}).catch(function (error) {
      // An error happened.
});
/*
firebase.auth().onAuthStateChanged((user) => {
      if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            // ...
            console.log(user.displayName);
            console.log("uid :: ", uid);
            // window.location.assign("./home.html");

      } else {
            // User is signed out
            // ...
            console.log("afdafassfggfagfgagf");
            //window.location.assign("./index.html");
      }
});
*/