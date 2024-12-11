// import Razorpay from 'razorpay';

// const razorpay = new Razorpay({
//   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     console.log('coming');
    
//     const { amount, currency, receipt } = req.body;
//     console.log(req.body, "req.body")
//     try {
//       const options = {
//         amount: amount * 100, 
//         currency,
//         receipt,
//       };
//       const order = await razorpay.orders.create(options);
//       console.log(order, "response");
      
//       res.status(200).json(order);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }