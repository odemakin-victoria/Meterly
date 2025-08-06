import qrCode from "../../public/assets/images/qr.svg";
import changePin from "../../public/assets/images/changeResetPin.svg";
import changePassword from "../../public/assets/images/changePassword.svg";
export const profileOptions = [
  {
    section: "Privacy & Security",
    options: [
      {
        title: "Change PIN",
        icon: changePin,
      },
      {
        title: "Reset PIN",
        icon: changePin,
      },
      {
        title: "Change Password",
        icon: changePassword,
      },
    ],
  },
  {
    section: "Account",
    options: [
      {
        title: "KYC",
        icon: qrCode,
      },
      {
        title: "Transaction Limit",
        icon: qrCode,
      },
      {
        title: "Account Officer",
        icon: qrCode,
      },
      {
        title: "SMS Alerts",
        icon: qrCode,
      },
      {
        title: "Transaction Confirmation Method",
        icon: qrCode,
      },
    ],
  },
];
