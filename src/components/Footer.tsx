import { AtSign, Heart, Instagram } from 'lucide-react';
import { FC } from 'react';
import { Badge } from './ui/badge';

interface FooterProps {
    type: string;
}

const Footer: FC<FooterProps> = ({ type }) => {
    return (
        <div
            className={
                'absolute text-neutral-50 w-full grid place-items-center bottom-0 bg-neutral-900/80 rounded-lg p-2' +
                ` ${type === 'search' ? '' : 'small:relative small:mt-2'}`
            }
        >
            <div className="grid place-items-center w-full gap-1 bg-neutral-800/80 rounded-lg p-2 mb-2">
                <div className="text-xs xl:text-sm flex gap-1">
                    <span>For Future Updates!</span>
                    <p className="text-xs xl:text-sm flex gap-1 items-center">
                        <a
                            className="flex gap-1 hover:text-teal-700 transition"
                            href="https://www.instagram.com/syllabusx_.live/"
                            target="_blank"
                        >
                            Follow us on{' '}
                            <Instagram className="w-4 h-4 xl:h-6 xl:w-6" />
                        </a>
                    </p>
                </div>
            </div>
            <div className="relative grid place-items-center w-full gap-3 bg-neutral-800/80 rounded-lg p-2">
                <p className="text-sm flex items-center gap-1 xl:text-base">
                    Made with <Heart className="h-4 w-4" />
                </p>
                <Badge className="absolute text-xs opacity-0 hover:opacity-100 transition bottom-2 right-2">
                    v3.2.1
                </Badge>
                <div className="transition flex items-center gap-2">
                    <a
                        className="text-xs flex gap-1 hover:text-teal-700 transition"
                        href="https://linktr.ee/akshatOwO"
                        target="_blank"
                    >
                        <AtSign className="h-4 w-4" />
                        akshat
                    </a>
                    <a
                        className="text-xs flex gap-1 hover:text-teal-700 transition"
                        href="https://linktr.ee/shouryapal"
                        target="_blank"
                    >
                        <AtSign className="h-4 w-4" />
                        shourya
                    </a>
                    <a
                        className="text-xs flex gap-1 hover:text-teal-700 transition"
                        href="https://linktr.ee/yom4n"
                        target="_blank"
                    >
                        <AtSign className="h-4 w-4" />
                        sparsh
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
