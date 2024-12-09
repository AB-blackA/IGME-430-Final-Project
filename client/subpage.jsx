const helper = require('./helper.js');
const React = require('react');
const { createRoot } = require('react-dom/client');
const { useState, useEffect } = React;
const { BrowserRouter, Route, Routes } = require('react-router-dom');

const ThreadList = (props) => {
    const [threadList, setThreads] = useState(props.threads);

    useEffect(() => {
        const getThreadsFromServer = async () => {
            try {
                const response = await fetch(`/subPageData?name=${subpageName}`);
                const data = await response.json();
                if (response.ok) {
                    setThreads(data.threads);
                } else {
                    console.error('Failed to fetch threads:', data.message);
                }
            } catch (err) {
                console.error('Error fetching threads:', err);
            }
        };
    
        getThreadsFromServer();
    }, [subpageName]); 
    

    if (threadList.length === 0) {
        return (
            <div className='threadList'>
                <h3 className='emptyList'>No Threads Found</h3>
            </div>
        );
    }

    const threadNodes = threadList.map((thread) => (
        <div key={thread} className='threads'>
            <img src='/assets/img/face.png' alt='thread pic' className='threadPic' />
            <h3 className='threadName'>Name: {thread}</h3>
        </div>
    ));

    return <div className='threadList'>{threadNodes}</div>;
};

// Route Path needs an element.
// and probably a million other things
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/subpage/:subpageName"/>
            </Routes>
        </BrowserRouter>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;
