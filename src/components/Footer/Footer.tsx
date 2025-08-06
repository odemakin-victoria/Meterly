import footerImg from "../../../public/assets/images/footer.svg";
export default function Footer(): JSX.Element {
  return (
    <footer
      className="fixed bottom-0 h-8 left-0 right-0 w-full z-10 bg-no-repeat bg-cover md:bg-contain"
      style={{
        backgroundImage: `url(${footerImg})`,
        backgroundPosition: "bottom",
      }}
    ></footer>
  );
}
