import { Loader } from 'lucide-react';
import { cn } from '@/utils/utils';

const Loading = (props: { className?: string }) => <Loader className={cn('rgpi-loading animate-spin', props.className)} />;

export { Loading };
