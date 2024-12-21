import { Button } from '@/components/button';
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen bg-white grid place-items-center mx-auto py-8'>
            <div className='text-blue-900 text-2xl font-bold flex flex-col items-center space-y-4'>
                <h1>Vite + Reasact + TS + Tailwind + shadcn/ui</h1>
                <Button onClick={() => navigate('/user/login')}>Count up ({123})</Button>
            </div>
        </div>
    );
}

export default App;
