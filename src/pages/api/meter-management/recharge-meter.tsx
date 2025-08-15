// pages/api/kyc/updateCustomer.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cookie from "cookie";



export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
	const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
				const cookies = cookie.parse(req.headers.cookie || "");
							const token = (cookies["MET_AT"]);
				const clientId = process.env.NEXT_PUBLIC_CLIENT_ID

		try {
			const result = await axios.post(`${apiUrl}/meter_management/recharge_meter`, req.body, {
				headers: {
					Accept: "application/json",
										Authorization: `Bearer ${token}`,

					"x-api-key":clientId,
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
