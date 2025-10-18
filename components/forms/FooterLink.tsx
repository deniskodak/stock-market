import { FooterLinkProps } from "@/interfaces/auth.interface";
import Link from "next/link";
import { FunctionComponent } from "react";

const FooterLink: FunctionComponent<FooterLinkProps> = ({
  text,
  linkText,
  href,
}) => {
  return (
    <div className="text-center pt-4">
      <p className="text-sm text-gray-500">
        {text}{" "}
        <Link href={href} className="footer-link">
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default FooterLink;
