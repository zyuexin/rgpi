import HeaderLeft from './left';
import HeaderRight from './right';
export default function Header() {
    return (
        <header className='header flex justify-between items-center px-4 min-h-12 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <HeaderLeft />
            <HeaderRight />
        </header>
    );
}
