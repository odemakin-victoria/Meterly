// pages/api/auth/onboarding-user/[token].ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    // ✅ Get token from URL parameters (query), not from body
    const { token } = req.query;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;


    // ✅ Validate token exists
    if (!token || typeof token !== 'string') {
      return res.status(400).json({ 
        message: "Token is required in URL path" 
      });
    }
    
    const fullUrl = `${apiUrl}/auth/complete_onboarding/${token}`;
    console.log("🚀 FULL URL BEING CALLED:", fullUrl);
    console.log("================================");

    try {
      const result = await axios.post(
        fullUrl,
        req.body, // Send the body data (user details)
        {
          headers: {
            Accept: "application/json",
            "x-api-key": clientId,
          },
        }
      );
      
  
      return res.status(result.status).json(result.data);
    } catch (error) {
      console.error("❌ ERROR in API route:", error);
      
      // More detailed error logging
      if (axios.isAxiosError(error)) {
       
        const encryptedError =
          error.response?.data || "Encrypted error not available";
        return res.status(error.response?.status || 500).json(encryptedError);
      } else {
        console.error("❌ Unexpected error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}