import whiteHome from "../../public/assets/images/white-home.svg";
import whiteCash from "../../public/assets/images/white-cash.svg";
import whiteInvite from "../../public/assets/images/inviteWhite.svg";
import whiteMenu from "../../public/assets/images/white-menu.svg";
import blueHome from "../../public/assets/images/blue-home.svg";
import blueCash from "../../public/assets/images/blue-cash.svg";
import blueInvite from "../../public/assets/images/inviteBlue.svg";
import blueMenu from "../../public/assets/images/blue-menu.svg";
import whiteSetting from "../../public/assets/images/accountSettingWhite.svg"
import BlueSetting from "../../public/assets/images/accountSettingBlue.svg"

export const NavLinksData = [
  {
    icon: whiteMenu,
    icon2: blueMenu,
    name: "Account Upgrade",
    link: "/account-upgrade",
  },
  {
    icon: whiteCash,
    icon2: blueCash,
    name: "Account Update",
    link: "/account-update",
  },


];

export const MerchantLinksData = [
  {
    icon: whiteMenu,
    icon2: blueMenu,
    name: "Dashboard",
    link: "/home",
  },
  {
    icon: whiteSetting,
    icon2: BlueSetting,
    name: "Account Manager",
    link: "/payments",
  },

  {
    icon: whiteInvite,
    icon2: blueInvite,
    name: "Invite Friends",
    link: "/cards",
  },

];
