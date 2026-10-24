import Logo from "@/components/ui/Logo";
import NavigationItems from "./NavigationItems";
import { menuItems } from "./menuItems";

export function Navbar() {
  return (
      <nav
        className="site-nav flex flex-row z-0 items-center justify-between border-white w-full"
      >
        <div>
          <Logo />
        </div>
        <NavigationItems menuItems={menuItems}/>
      </nav>
  );
}
