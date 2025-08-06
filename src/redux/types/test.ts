const assignedReviewer = async (documentId: number) => {
	try {
		setAlertState((prev) => ({
			...prev,
			show: true,
			loading: true,
		}));

		const result = await dispatch(
			AssignedReviewer({
				RequestId: documentId,
				User: email,
			})
		);

		const { meta, payload } = result;

		if (meta.requestStatus === "rejected") {
			const errorObj = payload as ErrorResponse;

			setAlertState((prev) => ({
				...prev,
				show: true,
				loading: false,
				title: errorObj?.errorMsg || "Request Failed",
				icon: "error",
			}));
			return;
		}

		if (meta.requestStatus === "fulfilled") {
			let res = payload as AssignedReviewerResponse;
			console.log(res, "Document Accepted");
		}
	} catch (error) {
		setAlertState((prev) => ({
			...prev,
			show: true,
			loading: false,
			title: "Something went wrong. Please try again",
			icon: "error",
		}));
		throw error;
	}
};