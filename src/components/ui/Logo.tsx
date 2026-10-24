import Image from "next/image";
import logo from '@/assets/logo.png';
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="-m-1.5 -mt-1 p-1.5">
        <Image src={logo} alt="Home" width={48} height={48}/>
      </Link>
    </div>
  );
};

export default Logo;
