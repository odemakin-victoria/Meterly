import qrCode from "../../public/assets/images/qr.svg";
import limit from "../../public/assets/images/limitIcon.svg";
export const moreOptions = [
  {
    section: "Payments",
    options: [
      {
        title: "Pay with QR",
        icon: qrCode,
      },
      {
        title: "Pay Bills",
        icon: qrCode,
      },
      {
        title: "Scheduled Transactions",
        icon: qrCode,
      },
    ],
  },
  {
    section: "Services",
    options: [
      {
        title: "Beneficiaries",
        icon: qrCode,
      },
      {
        title: "Loans",
        icon: qrCode,
      },
    ],
  },
  {
    section: "Account",
    options: [
      {
        title: "Account Officer",
        icon: qrCode,
      },
      {
        title: "Change Password",
        icon: qrCode,
      },
      {
        title: "Change PIN",
        icon: qrCode,
      },
      {
        title: "History",
        icon: qrCode,
      },
      {
        title: "KYC",
        icon: qrCode,
        isFullPage: true,
      },
      {
        title: "Limit",
        icon: limit,
      },
      {
        title: "Reset PIN",
        icon: qrCode,
      },
   
    ],
  },
];
