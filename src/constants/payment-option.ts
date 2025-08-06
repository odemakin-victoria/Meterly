import Bank from "../../public/assets/images/bi_bank (2).svg";
import debitCard from "../../public/assets/images/mdi_credit-cards (1).svg";
import paymentMethod from "../../public/assets/images/paymentMethod.svg";
export const cardOptions = [
  {
    title: "Pay With Card",
    subTitle: "Pick up or get a new card delivered to you!",
    icon: debitCard,
  },
  {
    title: "Pay With OptiPay (Bank Transfer)",
    subTitle: "Ready to start using your new card? Click here.",
    icon: Bank,
  },

  {
    title: "Choose from Saved Payment Methods",
    subTitle: "Change your PIN in simple steps!",
    icon: debitCard,
  },

];

export const cardReasons = [
  {
    name: "New Card",
    code: "0",
  },
  {
    name: "Suspected Fraud",
    code: "1",
  },
  {
    name: "Lost Card",
    code: "2",
  },
  {
    name: "Stolen Card",
    code: "3",
  },
  {
    name: "Retracted Card",
    code: "4",
  },
  {
    name: "Damaged Card",
    code: "5",
  },
];
export const cardBranches = [
  {
    name: "Bishop Oluwole",
    code: "0",
  },
  {
    name: "Sanusi Fafunwa",
    code: "1",
  },
  {
    name: "Alagomeji Yaba",
    code: "2",
  },
];
export const cardSupportIssues = [
  {
    title: "My card is damaged, stolen or lost",
    content:
      "Go to Cards - Request Card to apply for a new card and invalidate the old one. For added security, freeze  stolen or lost card to immediately disable it by navigating to Cards -Lock",
  },
  {
    title: "My card has been retracted",
    content:
      "Go to Cards - Request Card to apply for a new card and invalidate the old one.",
  },
  {
    title: "Suspected fraud with my card",
    content:
      "Go to Cards - Request Card to apply for a new card and invalidate the old one. For added security, freeze  stolen or lost card to immediately disable it by navigating to Cards -Lock ",
  },
  {
    title: "Card PIN not working",
    content:
      "Go to Cards - Request Card to apply for a new card and invalidate the old one. For added security, freeze  stolen or lost card to immediately disable it by navigating to Cards -Lock ",
  },
];
