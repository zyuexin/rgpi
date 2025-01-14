import { cn } from '@/utils/common';

interface SvgProps<TElement extends SVGElement = SVGElement> extends React.SVGAttributes<TElement> {
    code: string;
}

export const SymbolIcon = (props: SvgProps) => {
    return (
        <svg {...props} className={cn('icon text-2xl', props.className)} aria-hidden='true'>
            <use xlinkHref={`#icon-${props.code}`}></use>
        </svg>
    );
};
