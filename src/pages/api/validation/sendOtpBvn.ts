// pages/api/kyc/updateCustomer.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
 const apiUrl = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
const channelId = process.env.NEXT_PUBLIC_CLIENT_ID

    try {
      // Make the request to the external API
      const result = await axios.post(`${apiUrl}/OTP/bvn`, req.body, {
        headers: {
          Accept: "application/json",
					"x-clientId":channelId,
        },
      });

      return res.status(result.status).json(result.data);
    } catch (error) {
      console.error("Error in API route:", error);

      if (axios.isAxiosError(error)) {
        // Extract and return encrypted error response
        const encryptedError =
          error.response?.data || "Encrypted error not available";
        return res.status(error.response?.status || 500).json(encryptedError);
      } else {
        // Handle any other types of errors
        console.error("Unexpected error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
