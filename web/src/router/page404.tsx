import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components';
import { Frown } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 引入useNavigate钩子

export default () => {
    const navigate = useNavigate();

    return (
        <Card className='w-80 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
            <CardHeader>
                <CardTitle>
                    <Frown />
                </CardTitle>
                <CardDescription>404 Not found</CardDescription>
            </CardHeader>
            <CardContent>Not Found Page</CardContent>
            <CardFooter className='grid grid-cols-1 gap-2'>
                <Button onClick={() => void navigate(-1)} className='w-full'>
                    Go Back
                </Button>
                <Button variant='ghost' onClick={() => void navigate('/user/login')} className='w-full'>
                    To Login
                </Button>
            </CardFooter>
        </Card>
    );
};
