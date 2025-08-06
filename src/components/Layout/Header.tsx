import Image from "next/image";
import leadwayLogo from "../../../public/assets/images/Image 1.svg"

const Header = () => {
  
		
			


  return (
    <>
      <div className="sticky z-20  bg-[#311302] top-0 left-0 w-full flex justify-between shadow-lg px-6 items-center h-12  md:h-16 md1:py-0 ">
			<Image
              src={leadwayLogo}
              className="object-center object-contain w-[100px] md:w-[150px]"
              alt="leadway icon"
            />
      
		
			
		
      </div>
    </>
  );
};

export default Header;
