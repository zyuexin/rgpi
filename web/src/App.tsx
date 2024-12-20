import { Button } from '@/components/button';
import React from 'react';
import request from '@/api/request';

function App() {
    const [count, setCount] = React.useState(0);

    return (
        <div className='min-h-screen bg-white grid place-items-center mx-auto py-8'>
            <div className='text-blue-900 text-2xl font-bold flex flex-col items-center space-y-4'>
                <h1>Vite + Reasact + TS + Tailwind + shadcn/ui</h1>
                <Button>Count up ({count})</Button>
            </div>
        </div>
    );
}

export default App;
