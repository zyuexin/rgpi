import Header from '@/pages/main/header';
import Content from '@/pages/main/content';

function App() {
    return (
        <div className='app relative h-full flex flex-col overflow-hidden'>
            <Header />
            <Content />
        </div>
    );
}

export default App;
