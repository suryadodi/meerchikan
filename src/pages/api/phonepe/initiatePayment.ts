import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import sha256 from "crypto-js/sha256";


const BASE_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
const MERCHANT_ID = process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_ID;
const MERCHANT_KEY = process.env.NEXT_PUBLIC_PHONEPE_SECRET_KEY;
const SLAT_INDEX = process.env.NEXT_PUBLIC_PHONEPE_SLAT_INDEX;
 




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { amount, orderId, customerPhone } = req.body;

    if (!amount || !orderId || !customerPhone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const payload = {

      merchantId: MERCHANT_ID,
      merchantTransactionId:orderId,
      amount: amount * 100,
      redirectMode: "POST",
      callbackUrl: `http://127.0.0.1:3000/api/phonepe/webhook?id${orderId}`,
      redirectUrl: "http://127.0.0.1:3000/cartproducts",
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const dataPayload = JSON.stringify(payload);
     const dataBase64 = Buffer.from(dataPayload).toString("base64");
      const urlForChecksum = `${dataBase64}/pg/v1/pay${MERCHANT_KEY}`;
      const dataSha256 = sha256(urlForChecksum).toString();
      const checksum = `${dataSha256}###${SLAT_INDEX}`;


    const response = await axios.post(
      BASE_URL,
      {
        request: dataBase64
      },
      {
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json',
          "X-VERIFY": checksum,
        }
      }
    );

   res.status(200).json(response.data);

  }
  catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "An error occurred while processing the request.",
      details: error,
    });
  }
}