// pages/api/auth/changePassword.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cookie from "cookie";
import { decryptData } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const clientId = process.env.CLIENTID;
    const apiUrl = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = decryptData(cookies["RIB_AT"]);

    try {
      // Make the request to the external API
      const result = await axios.post(`${apiUrl}/password`, req.body, {
        headers: {
          Accept: "application/json",
          clientId: clientId,
          Authorization: `Bearer ${token}`,
        },
      });

      return res.status(result.status).json(result.data);
    } catch (error) {
      console.error("Error in API route:", error);

      // Extract and return encrypted error response
      const encryptedError =
        error.response?.data || "Encrypted error not available";
      return res.status(error.response?.status || 500).json(encryptedError);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
