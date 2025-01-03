import { useEffect } from 'react';
import { /* Button, */ Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components';
import { UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 引入useNavigate钩子
import { useCountdown } from '@/hooks';

export default () => {
    const navigate = useNavigate();
    const { time, start, clear } = useCountdown(5);

    useEffect(() => {
        start();
        return clear;
    }, []);

    useEffect(() => {
        if (time === 0) {
            navigate('/user/login', { replace: true });
        }
    }, [time]);

    return (
        <Card className='w-80 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
            <CardHeader>
                <CardTitle>
                    <UserX />
                </CardTitle>
                <CardDescription>403 Unauthorized</CardDescription>
            </CardHeader>
            <CardContent>You're not logged in.</CardContent>
            <CardFooter>
                {/* <Button onClick={() => void navigate('/user/login')} className='w-full'>
                    To Login
                </Button> */}
                {time}
            </CardFooter>
        </Card>
    );
};
