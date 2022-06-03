require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const { resolve } = require('path')
const session = require('express-session')
var admin = require('firebase-admin')
const cors = require('cors')
var serviceAccount = require('./service-key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

var db = admin.firestore()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27'
})

const app = express()
const port = process.env.PORT || 8080
app.use(express.static('./client'))
app.use(
  session({
    secret: 'SECRET_FOR_SESSION_',
    resave: false,
    saveUninitialized: true
  })
)
app.use(cors())

// use this one

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next()
  } else {
    bodyParser.json()(req, res, next)
  }
})

app.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  (request, response) => {
    const sig = request.headers['stripe-signature']

    let event

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type === 'account.updated') {
      const account = event.data.object
      handleAccountUpdate(res, account)
    }

    response.json({ received: true })
  }
)

const handleAccountUpdate = (res, account) => {
  db.collection('testing').add({
    account
  })
  // Collect more required information, e.g.
}

app.get('/', (req, res) => {
  const path = resolve('./client' + '/index.html')
  res.sendFile(path)
})

app.post('/onboard-user', async (req, res) => {
  var { uid } = req.query

  if (typeof uid != 'string') {
    return res.json({
      success: false,
      errMessage: 'Sorry, wrong params provided to our API.'
    })
  }

  try {
    const account = await stripe.accounts.create({
      type: 'express',
      capabilities: {
        card_payments: {
          requested: true
        },
        transfers: {
          requested: true
        }
      }
    })
    req.session.accountID = account.id

    const origin = `${req.headers.origin}`
    const accountLinkURL = await generateAccountLink(account.id, origin)
    db.collection('users')
      .doc(uid)
      .update({
        stripe_account_id: account.id,
        returned: false
      })
    res.send({ url: accountLinkURL })
  } catch (err) {
    res.status(500).send({
      error: err.message
    })
  }
})

app.post('/refund', async (req, res) => {
  var { payment_intent } = req.body
  console.log('payment_intent', payment_intent)
  try {
    const refunds = await stripe.refunds.create({
      payment_intent: payment_intent
    })
    console.log('refunds', refunds)
    res.json({
      success: true,
      refunds: refunds.id,
      message: `Reembolso enviado con éxito`
    })
  } catch (e) {
    console.log('error', e)
    return res.status(500).json({
      success: false,
      errMessage: e.message
    })
  }
})

app.post('/paymentIntentConfirm', async (req, res) => {
  var { payment_intent } = req.body
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent)
    res.json({
      success: true,
      paymentIntent: paymentIntent,
      message: `Reembolso enviado con éxito`
    })
  } catch (e) {
    console.log('error', e)
    return res.status(500).json({
      success: false,
      errMessage: e.message
    })
  }
})

app.post('/payout', async (req, res) => {
  var { to, amount } = req.body
  try {
    const topup = await stripe.topups.create({
      amount: Number(amount) * 100,
      currency: 'usd',
      description: 'Payout',
      statement_descriptor: new Date().getTime()
    })
    const transfer = await stripe.transfers.create({
      amount: Number(amount) * 100,
      currency: 'eur',
      destination: to
    })
    res.json({
      success: true,
      message: `Successfully sent ${amount} to ${to}`
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      errMessage: e.message
    })
  }
})

app.post('/payment-sheet', async (req, res) => {
  var { amount, to_account_id, fee } = req.body
  console.log('to_account_id: ', to_account_id)

  if (typeof amount != 'string' && !Number(amount))
    return res.json({
      success: false,
      errMessage: 'Invalid PARAM supplied to the API',
      amount,
      type: typeof amount
    })
  try {
    const customer = await stripe.customers.create()

    // Here, we're getting latest customer only for example purposes.
    if (!customer) {
      return res.send({
        error: 'You have no customer created'
      })
    }
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2020-08-27' }
    )

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: Number(amount) * 100,
      currency: 'eur',
      customer: customer.id,
      application_fee_amount: fee ? fee * 100 : 0.05 * 100,
      transfer_data: {
        destination: to_account_id
      }
    })
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id
    })
  } catch (e) {
    return res.status(500).json({
      errMessage: e.message
    })
  }
})

app.get('/verify/:uid', async (req, res) => {
  var { uid } = req.params

  if (typeof uid != 'string') {
    return res.json({
      success: false,
      errMessage: 'Wrong params sent to the API'
    })
  }

  return db
    .collection('users')
    .doc(uid)
    .get()
    .then(async data => {
      if (data.exists) {
        var { stripe_account_id } = data.data()
        var account = await stripe.accounts.retrieve(stripe_account_id)
        var { details_submitted, requirements } = account

        if (details_submitted) {
          data.ref
            .update({
              is_verified: true
            })
            .then(() => {
              return res.json({
                verified: true,
                remaining: [],
                success: true
              })
            })
        } else {
          return res.json({
            verified: false,
            success: false,
            remaining: requirements.currently_due
          })
        }
      } else {
        return res.json({
          verified: false,
          success: false,
          errMessage: 'No corresponding account found'
        })
      }
    })
})

app.get('/onboard-user/refresh', async (req, res) => {
  if (!req.session.accountID) {
    res.redirect('/')
    return
  }
  try {
    const { accountID } = req.session
    const origin = `${req.secure ? 'https://' : 'https://'}${req.headers.host}`

    const accountLinkURL = await generateAccountLink(accountID, origin)
    db.collection('users')
      .where('stripe_account_id', '==', accountID)
      .get()
      .then(function responseFromFStore (list) {
        var user = list.docs[0]
        user.ref.update({
          returned: false
        })
      })
    res.redirect(accountLinkURL)
  } catch (err) {
    res.status(500).send({
      error: err.message
    })
  }
})

function generateAccountLink (accountID, origin) {
  return stripe.accountLinks
    .create({
      type: 'account_onboarding',
      account: accountID,
      refresh_url: `${origin}/onboard-user/refresh?accountID=${accountID}`,
      return_url: `${origin}/success.html?accountID=${accountID}`
    })
    .then(link => link.url)
}

app.post('/charge', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, POST')
  var { amount, stripe_account_id } = req.body
  stripe.tokens.create(
    {
      card: {
        number: req.body.number.trim(), //string
        exp_month: Number(req.body.month), //number
        exp_year: Number(req.body.year), //num
        cvc: req.body.cvc //string
      }
    },
    async function (err, token) {
      // asynchronously called
      if (err) {
        console.log(err)
        return res.json({
          error: true,
          message: err.raw.message,
          err: {
            message: err.raw.message
          },
          body: req.body.number,
          number:
            String(req.body.number).length === 16
              ? req.body.number
              : req.body.card_number,
          month: Number(req.body.month),
          year: Number(req.body.year),
          cvc: req.body.cvc
        })
      }
      try {
        stripe.customers.createSource(
          req.body.customerId,
          { source: token.id },
          async function (err, card) {
            if (err) {
              let message = 'Something went wrong! Please try again later'
              let stringifiedErr = err.message
              switch (err.type) {
                case 'StripeCardError':
                  // A declined card error
                  message = err.raw ? err.raw.message : err.message // => e.g. "Your card's expiration year is invalid."
                  break
                case 'StripeRateLimitError':
                  message = 'Too many requests made to the API too quickly'
                  break
                case 'StripeInvalidRequestError':
                  message = err.raw ? err.raw.message : err.message
                  break
                case 'StripeAPIError':
                  message = "An error occurred internally with Stripe's API"
                  break
                case 'StripeConnectionError':
                  message =
                    'Some kind of error occurred during the HTTPS communication'
                  break
                case 'StripeAuthenticationError':
                  message = ' You probably used an incorrect API key'
                  break
                default:
                  message = err.message
                  // Handle any other types of unexpected errors
                  break
              }
              return res.json({
                error: true,
                message,
                source: 1,
                err,
                stringifiedErr
              })
            } else {
              try {
                const charge = await stripe.charges
                  .create({
                    amount: Number(amount) * 100,
                    currency: 'eur',
                    source: card
                  })
                  .then(async data => {
                    const topup = await stripe.topups.create({
                      amount: Number(amount) * 100,
                      currency: 'eur',
                      description: 'Initializing Payment'
                    })
                    await stripe.transfers.create({
                      amount: 1000,
                      currency: 'usd',
                      destination: stripe_account_id,
                      transfer_group: 'order_1'
                    })
                    return res.json({
                      success: true
                    })
                  })
              } catch (e) {
                return res.json({
                  success: false,
                  errMessage: e.message
                })
              }
            }

            // asynchronously called
          }
        )
      } catch (err) {
        res.status(500).json({
          error: true,
          message: err.message
        })
      }
    }
  )
})

function getKeys () {
  let secret_key = process.env.STRIPE_SECRET_KEY
  let publishable_key = process.env.STRIPE_PUBLISHABLE_KEY

  return { secret_key, publishable_key }
}
app.listen(port, () => console.log(`Node server listening on port ${port}!`))
