import Link from "next/link";
import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  href?: string;
}

export function Button({ href, children, ...props }: ButtonProps) {
  // A link styled as a button: nesting <button> inside <a> is invalid HTML.
  if (href) {
    return (
      <Link href={href} className="button">
        {children}
      </Link>
    );
  }

  return <button {...props}>{children}</button>;
}
