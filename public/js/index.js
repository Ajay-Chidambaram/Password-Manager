
// Terminal Command
// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

/****************************************************************
 *                DOM Manipulations
 ***************************************************************/

const signupEmail = document.getElementById('signup_id');
const signupPassword = document.getElementById('signup_pass');
const signinEmail = document.getElementById("signin_id");
const signinPassword = document.getElementById("signin_pass");
const signInButton = document.getElementById("signin_button");
const signUpButton = document.getElementById('signup_button');

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
const auth = firebase.auth();

/****************************************************************
 *                Firebase Authentication UIConfig
 ***************************************************************/
var uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: "./firstpage.html",
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



/****************************************************************
 *       SignIN And SignUP using Email and Password
 ***************************************************************/


const signInWithEmailFunction = () => {
      const email = signinEmail.value;
      const password = signinPassword.value;
      console.log(`Email = ${email} , Password = ${password}`);

      auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                  //console.log("Sign In User Details ", user)
                  // console.log(firebase.auth().currentUser.uid);
                  window.location.assign('./firstpage.html');
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
                  // console.log("Sign Up User Details ", user)
                  alert("Successfully Created Your Account .... Please SignIN to Enter");
                  window.location.assign("./firstpage.html");
            })
            .catch((error) => {
                  alert(error.code, "\n", error.message);
            })
}


signInButton.addEventListener("click", signInWithEmailFunction);
signUpButton.addEventListener("click", signUpWithEmailFunction);


/****************************************************************
 *       LogOut incase User Already Exists
 ***************************************************************/

firebase.auth().signOut().then(function () {
      // Sign-out successful.
      console.log("logged outttt");
}).catch(function (error) {
      // An error happened.
});
