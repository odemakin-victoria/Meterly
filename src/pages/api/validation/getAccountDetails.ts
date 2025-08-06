// pages/api/account/fetchAccountDetails.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cookie from "cookie";
import { decryptData, returnCookie } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const apiUrl = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
				const cookies = cookie.parse(req.headers.cookie || "");
				const token = (cookies["KYC_AT"]);

    const { accountNo } = req.query;
    try {
      // Make the request to the external API
      const result = await axios.get(`${apiUrl}/account/get-by-account-number?accountNo=${accountNo}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
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
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
