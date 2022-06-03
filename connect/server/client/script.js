let elmButton = document.querySelector('#submit')

if (elmButton) {
  elmButton.addEventListener(
    'click',
    (e) => {
      elmButton.setAttribute('disabled', 'disabled')
      elmButton.textContent = 'Please wait...'

      var urlSearchParams = new URLSearchParams(window.location.search)
      var { uid } = Object.fromEntries(urlSearchParams.entries())

      fetch(`https://magna-stripe.herokuapp.com/onboard-user?uid=${uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.url) {
            window.location = data.url
          } else {
            elmButton.removeAttribute('disabled')
            elmButton.textContent = '<Something went wrong>'
            console.log('data', data)
          }
        })
    },
    false
  )
}

var urlSearchParams = new URLSearchParams(window.location.search)
var { accountID } = Object.fromEntries(urlSearchParams.entries())
if (accountID && window.location.href.includes('success')) {
  var firebaseConfig = {
    // new firebase configure
    apiKey: 'AIzaSyAn2DYg6GKmuJXZbfBY1QympORXkhGYPrA',
    authDomain: 'stripe-propinas.firebaseapp.com',
    projectId: 'stripe-propinas',
    storageBucket: 'stripe-propinas.appspot.com',
    messagingSenderId: '890308201700',
    appId: '1:890308201700:web:cab72b271a55b4d41870f1',
    measurementId: 'G-CM2MH8S1FQ'
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  firebase
    .firestore()
    .collection('users')
    .where('stripe_account_id', '==', accountID)
    .get()
    .then((data) => {
      if (data.docs.length > 0) {
        var user = data.docs[0]
        user.ref.update({
          returned: true,
          is_verified: true
        })
      } else {
        console.log('Relevant account not found')
      }
    })
}
