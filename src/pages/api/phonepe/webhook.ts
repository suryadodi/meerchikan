
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { transactionId, status } = req.body;

      // Log or handle payment status
      console.log("comingHook");
      
      console.log(`Transaction ID: ${transactionId}, Status: ${status}`);

      res.status(200).json({ message: 'Webhook processed successfully' });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ error: 'Failed to process webhook' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
