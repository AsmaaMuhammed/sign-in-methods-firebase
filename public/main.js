  /**
   * Reads the phone number from the user input.
   */
  function getPhoneNumberFromUserInput() {
    return document.getElementById('phone-number').value;
  }

  /**
   * Returns true if the phone number is valid.
   */
function isPhoneNumberValid() {
    var pattern = /^\+[0-9\s\-\(\)]+$/;
    var phoneNumber = getPhoneNumberFromUserInput();
    return phoneNumber.search(pattern) !== -1;
  }

  /**
   * Returns true if the ReCaptcha is in an OK state.
   */
  function isCaptchaOK() {
    if (typeof grecaptcha !== 'undefined'
        && typeof window.recaptchaWidgetId !== 'undefined') {
      // [START getRecaptchaResponse]
      var recaptchaResponse = grecaptcha.getResponse(window.recaptchaWidgetId);
      // [END getRecaptchaResponse]
      return recaptchaResponse !== '';
    }
    return false;
  }
  /**
   * Updates the Sign-in button state depending on ReCAptcha and form values state.
   */
  function updateSignInButtonUI() {
    document.getElementById('quickstart-sign-in').disabled =
        !isCaptchaOK()
        || !isPhoneNumberValid()
        || !!window.signingIn;
  }
    /**
   * Updates the state of the Verify code form.
   */
  function updateVerificationCodeFormUI() {
    if (!firebase.auth().currentUser && window.confirmationResult) {
      document.getElementById('verification-code-form').style.display = 'block';
    } else {
      document.getElementById('verification-code-form').style.display = 'none';
    }
  }

  /**
   * Updates the state of the Sign-in form.
   */
  function updateSignInFormUI() {
    if (firebase.auth().currentUser || window.confirmationResult) {
      document.getElementById('quickstart-sign-in').style.display = 'none';
    } else {
      resetReCaptcha();
      document.getElementById('quickstart-sign-in').style.display = 'block';
    }
  }
 /**
   * Reads the verification code from the user input.
   */
  function getCodeFromUserInput() {
    return document.getElementById('verification-code').value;
  } 
 /**
   * Re-initializes the ReCaptacha widget.
   */
  function resetReCaptcha() {
    if (typeof grecaptcha !== 'undefined'
        && typeof window.recaptchaWidgetId !== 'undefined') {
      grecaptcha.reset(window.recaptchaWidgetId);
    }
  }
  /**
   * Updates the Verify-code button state depending on form values state.
   */
  function updateVerifyCodeButtonUI() {
      //alert(!!window.verifyingCode|| !getCodeFromUserInput());
    document.getElementById('verify-code-button').disabled =
        !!window.verifyingCode
        || !getCodeFromUserInput();
  } 
  /**
   * Function called when clicking the "Verify Code" button.
   */
  function onVerifyCodeSubmit(e) {
    e.preventDefault();
    if (!!getCodeFromUserInput()) {
      window.verifyingCode = true;
      updateVerifyCodeButtonUI();
      // [START verifyCode]
      var code = getCodeFromUserInput();
      confirmationResult.confirm(code).then(function (result) {
        // User signed in successfully.
        var user = result.user;
        // [START_EXCLUDE]
        window.verifyingCode = false;
        window.confirmationResult = null;
        updateVerificationCodeFormUI();
        // [END_EXCLUDE]
      }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        // [START_EXCLUDE]
        console.error('Error while checking the verification code', error);
        window.alert('Error while checking the verification code:\n\n'
            + error.code + '\n\n' + error.message);
        window.verifyingCode = false;
        updateSignInButtonUI();
        updateVerifyCodeButtonUI();
        // [END_EXCLUDE]
      });
      // [END verifyCode]
    }
  }
  /**
   * Cancels the verification code input.
   */
  function cancelVerification(e) {
    e.preventDefault();
    window.confirmationResult = null;
    updateVerificationCodeFormUI();
    updateSignInFormUI();
  }  
/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var phoneNumber = getPhoneNumberFromUserInput();
    if(!phoneNumber)
    {
        if (email.length < 4) {
        alert('Please enter an email address.');
        return;
        }
        if (password.length < 4) {
        alert('Please enter a password.');
        return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
        });
        // [END authwithemail]
    }
    else
    {
        if (isCaptchaOK() && isPhoneNumberValid()) {
            var appVerifier = window.recaptchaVerifier;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then(function (confirmationResult) {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    // [START_EXCLUDE silent]
                    window.signingIn = false;
                    // [END_EXCLUDE]
                    updateSignInButtonUI();
                    updateVerificationCodeFormUI();
                    updateVerifyCodeButtonUI();
                    updateSignInFormUI();
                }).catch(function (error) {
                    // Error; SMS not sent
                    // [START_EXCLUDE]
                    console.error('Error during signInWithPhoneNumber', error);
                    window.alert('Error during signInWithPhoneNumber:\n\n'
                        + error.code + '\n\n' + error.message);
                    window.signingIn = false;
                    updateSignInFormUI();
                    updateSignInButtonUI();
                    // [END_EXCLUDE]
                });
            // [END signin]
        }
    }
    document.getElementById('quickstart-sign-in').disabled = true;
    }
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var phoneNumber = document.getElementById('phone-number').value;
  if(!phoneNumber)
  {
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }

        // Create user with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
            } else {
            alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
        // [END createwithemail]
  }
}

/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  // [START sendemailverification]
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    // Email Verification sent!
    // [START_EXCLUDE]
    alert('Email Verification Sent!');
    // [END_EXCLUDE]
  });
  // [END sendemailverification]
}

function sendPasswordReset() {
  var email = document.getElementById('email').value;
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Password Reset Email Sent!');
    // [END_EXCLUDE]
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END sendpasswordemail];
}

function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    // [START_EXCLUDE silent]
    // document.getElementById('quickstart-verify-email').disabled = true;
    // [END_EXCLUDE]
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var phoneNumber = user.phoneNumber;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-sign-in').textContent = 'Sign in';
      document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]
    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
  });
  // [END authstatelistener]
    // [START appVerifier]
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': function(response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // [START_EXCLUDE]
          updateSignInButtonUI();
          // [END_EXCLUDE]
        },
        'expired-callback': function() {
          // Response expired. Ask user to solve reCAPTCHA again.
          // [START_EXCLUDE]
          updateSignInButtonUI();
          // [END_EXCLUDE]
        }
      });
      // [END appVerifier]
  
      // [START renderCaptcha]
      recaptchaVerifier.render().then(function(widgetId) {
        window.recaptchaWidgetId = widgetId;
      });
      // [END renderCaptcha]
  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
  document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
  document.getElementById('phone-number').addEventListener('keyup', updateSignInButtonUI);
  document.getElementById('phone-number').addEventListener('change', updateSignInButtonUI);
  document.getElementById('verification-code').addEventListener('keyup', updateVerifyCodeButtonUI);
  document.getElementById('verification-code').addEventListener('change', updateVerifyCodeButtonUI);
  document.getElementById('verification-code-form').addEventListener('submit', onVerifyCodeSubmit);
  document.getElementById('cancel-verify-code-button').addEventListener('click', cancelVerification);
}

window.onload = function() {
  initApp();
};