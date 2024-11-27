import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import { InputProps, Input } from '../input';
import { cn } from '@/utils/utils';
import { NonEmptyString } from '@/utils/typeutils';

export type InputWithAddonProps = InputProps & {
    afterSelections?: Array<{ label?: string; value: NonEmptyString<string> } | string>;
    afterValue?: string;
    afterAddonOnChange?: (value: string) => void;
    addonClassNames?: string;
    // beforeSelections?: Array<{ label: string; value: string }>;
    // beforeValue?: string;
    // beforeAddonOnChange?: (value: string) => void;
};

const InputWithAddon = React.forwardRef<HTMLInputElement, InputWithAddonProps>(
    ({ className, type, afterAddonOnChange, afterValue, afterSelections, addonClassNames, ...props }, ref) => {
        return (
            <div className='flex h-10 w-full rounded-md gap-4'>
                {/* {props?.beforeSelections && (
                    <Select>
                        <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Select a fruit' />
                        </SelectTrigger>
                    </Select>
                )} */}
                <Input type={type} ref={ref} {...props} className='flex-1' />
                <Select onValueChange={afterAddonOnChange} value={afterValue}>
                    <SelectTrigger className={cn('w-[115px]', addonClassNames)}>
                        <SelectValue placeholder='select...' />
                    </SelectTrigger>
                    <SelectContent>
                        {(afterSelections || []).map((i) => {
                            const label = typeof i === 'string' ? i : i?.label || i?.value || undefined;
                            const value = typeof i === 'string' ? i : i.value;
                            return (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>
        );
    }
);

export { InputWithAddon };
