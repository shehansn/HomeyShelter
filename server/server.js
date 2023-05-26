
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors());
require('dotenv').config()
const port = process.env.PORT
const key = process.env.STRIPE_KEY
const stripe = require('stripe')(key)
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const admin = require('firebase-admin');
const serviceAccount = require('F:/React cs individual project Y3S1/HomeyShelter Website/my-react-app-ae693-firebase-adminsdk-dnxco-5f29b2eb39.json'); // Replace with your own service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// Get a Firestore instance
const db = admin.firestore();

// Import Firestore modules
const { collection, doc, getDocs, orderBy, query, setDoc, onSnapshot, updateDoc, serverTimestamp, where, getDoc } = require('firebase/firestore');


app.get('/', (req, res) => {
  res.send("hello this is server")
})

app.post('/create-checkout-session', async (req, res) => {
  console.log("data in create-checkout-session",req.body)

  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.body.data.user.uid,
      order: JSON.stringify(req.body.data.orderItems),
      total: req.body.data.total,
      workItemID: req.body.data.workItemID,
      userDetails: JSON.stringify(req.body.data.userInformation)
    }
  })

  const line_items = req.body.data.orderItems.map(item => {
    return {
      price_data: {
        currency: 'LKR',
        product_data: {
          name: item.Name,
        },
        unit_amount: item.Price * 100,
      },
      quantity: 1,
    }
  })

  const session = await stripe.checkout.sessions.create({
    line_items,
    customer: customer.id,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkoutSuccess`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });
  res.send({ url: session.url })
  console.log("session url from server", session.url);

});

let endpointSecret;
//const endpointSecret = process.env.WEBHOOK_SECRET_KEY

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let eventType;
  let data;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  if (eventType === 'checkout.session.completed') {

    stripe.customers.retrieve(data.customer).then((customer) => {
      console.log('customer details', customer)
      console.log('data', data)
      createOrder(customer, data, res)
    })

    // res.sendStatus(200);
  }else{
    console.log("checkout.session.not completed")
  }
  res.send().end();//to avoid writing others data fter all finish
});

const createOrder =async (customer ,intent, res) => {
  try{
    const orderId=Date.now();
    const data={
      intentId:intent.id,
      orderId:orderId,
      amount:intent.amount_total,
      created:intent.created,
      payment_method_types:intent.payment_method_types,
      status:intent.payment_status,
      customer:intent.customer_details,
      shipping_details:intent.shipping_details,
      userId:customer.metadata.user_id,
      items: JSON.parse(customer.metadata.order),
      total:customer.metadata.total,
      sts:"processing",
      userDetails:JSON.parse(customer.metadata.userDetails),
      workItemID:customer.metadata.workItemID
    }
    console.log("data before saving",data)
    await db.collection("orders").doc(`/${orderId}/`).set(data);
    console.log("*****************************************")

    return res.status(200).send({success:true});
  }
  catch(err){
    console.log(err)
  }
} 

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})