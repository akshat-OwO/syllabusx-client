import LayoutWrapper from '@/layouts/LayoutWrapper';
import { FC } from 'react';
import { Icons } from './Icons';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
    return (
        <div className="self-end w-full h-20">
            <LayoutWrapper>
                <div className="h-20 py-5 flex items-center border-t border-border">
                    <Icons.logo className="h-full" />
                </div>
            </LayoutWrapper>
        </div>
    );
};

export default Footer;
