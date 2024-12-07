import Link from "next/link";
import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  href: string;
}

export function Button({ href, children, ...props }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} passHref>
        <button
          {...props}
        >
          {children}
        </button>
      </Link>
    );
  }

  return <button {...props}>{children}</button>;
}
