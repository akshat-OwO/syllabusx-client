import { cn } from '@/lib/utils';
import { FC } from 'react';
import { buttonVariants } from './button';

interface ShowCardProps {
    title: string;
    className?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    children?: React.ReactNode;
}

const ShowCard: FC<ShowCardProps> = ({
    className,
    children,
    title,
    iconLeft,
    iconRight,
}) => {
    return (
        <div
            className={cn(
                'flex items-center justify-between gap-x-5 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent text-accent-foreground shadow-2xl',
                className
            )}
        >
            {iconLeft ? (
                <div
                    className={cn(
                        buttonVariants({
                            variant: 'outline',
                            size: 'icon',
                            className:
                                'hover:bg-background hover:text-foreground',
                        })
                    )}
                >
                    {iconLeft}
                </div>
            ) : null}
            <div className="flex flex-col gap-2 justify-center">
                <div
                    className={cn(
                        'text-sm font-medium leading-none',
                        iconRight ? 'text-start' : 'text-end'
                    )}
                >
                    {title}
                </div>
                {children ? (
                    <p
                        className={cn(
                            'line-clamp-2 text-sm leading-snug text-muted-foreground',
                            iconRight ? 'text-start' : 'text-end'
                        )}
                    >
                        {children}
                    </p>
                ) : null}
            </div>
            {iconRight ? (
                <div
                    className={cn(
                        buttonVariants({
                            variant: 'outline',
                            size: 'icon',
                            className:
                                'hover:bg-background hover:text-foreground',
                        })
                    )}
                >
                    {iconRight}
                </div>
            ) : null}
        </div>
    );
};

export default ShowCard;
