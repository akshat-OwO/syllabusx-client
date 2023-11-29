import LayoutWrapper from '@/layouts/LayoutWrapper';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';
import { buttonVariants } from './ui/button';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
    return (
        <LayoutWrapper className='hidden md:block'>
            <div className="w-full flex justify-end items-center border-t border-border">
                <div className="flex items-center gap-x-5">
                    <Link
                        href={'/about-us'}
                        className={cn(buttonVariants({ variant: 'link' }))}
                    >
                        About Us
                    </Link>
                    <Link
                        href={'/contact-us'}
                        className={cn(buttonVariants({ variant: 'link' }))}
                    >
                        Contact Us
                    </Link>
                    <Link
                        href={'/t&c'}
                        className={cn(buttonVariants({ variant: 'link' }))}
                    >
                        Terms & Conditions
                    </Link>
                    <Link
                        href={'/privacy-policy'}
                        className={cn(buttonVariants({ variant: 'link' }))}
                    >
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Footer;
