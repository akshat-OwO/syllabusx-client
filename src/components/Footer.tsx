import LayoutWrapper from "@/layouts/LayoutWrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Footer = () => {
    return (
        <LayoutWrapper className="hidden border-t border-border md:block md:max-w-none md:px-16">
            <div className="flex w-full items-center justify-end">
                <div className="flex items-center gap-x-5">
                    <Link
                        href={"/about-us"}
                        className={cn(buttonVariants({ variant: "link" }))}
                    >
                        About Us
                    </Link>
                    <Link
                        href={"/contact-us"}
                        className={cn(buttonVariants({ variant: "link" }))}
                    >
                        Contact Us
                    </Link>
                    <Link
                        href={"/t&c"}
                        className={cn(buttonVariants({ variant: "link" }))}
                    >
                        Terms & Conditions
                    </Link>
                    <Link
                        href={"/privacy-policy"}
                        className={cn(buttonVariants({ variant: "link" }))}
                    >
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Footer;
