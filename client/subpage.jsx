/* Author: Andrew Black
 * Since: 12/3/24
 * subpage.jsx is the script page that works for the subpages. It gathers threads and allows
 * for the creation of them
 */

const React = require('react');
const { createRoot } = require('react-dom/client');
const { useState, useEffect } = React;

// this is how I get the params for subpages when making requests via the router
const urlParts = window.location.pathname.split('/');
const subpageName = decodeURIComponent(urlParts[urlParts.length - 1]);

// make a list of the threads
const ThreadList = (props) => {
    const [threadList, setThreads] = useState(props.threads);

    useEffect(() => {
        const getThreadsFromServer = async () => {
            const response = await fetch(`/subPageData?name=${subpageName}`);
            const data = await response.json();
            setThreads(data.threads);
        };
        getThreadsFromServer();
    }, [subpageName, props.reloadThreadList]); 

    if (threadList.length === 0) {
        return (
            <div className='threadList'>
                <h3 className='emptyList'>No Threads Found</h3>
            </div>
        );
    }

    const threadNodes = threadList.map((thread) => {
        const threadUrl = `/subPage/${subpageName}/${thread.name}`;
        return (
            <div key={thread.name} className='threads'>
                <h3 className='threadName'>
                    <a href={threadUrl} className='threadNames'>{thread.name}</a>
                </h3>
            </div>
        );
    });

    return (
        <div className='threadList'>{threadNodes}</div>
    );
};

// allows creation of threads
const CreateThread = async (event, subpageName, reloadThreadList, setReloadThreadList, setStatusMessage) => {
    event.preventDefault();
    const form = event.target;
    const threadName = form.threadName.value.trim();

    if (!threadName) {
        setStatusMessage('Thread name is required!');
        return;
    }

    const response = await fetch('/newThread', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subpageName,
            threadName,
        }),
    });

    if (response.ok) {
        setStatusMessage('Thread created successfully!');
        setReloadThreadList(!reloadThreadList);
    } else {
        setStatusMessage('Error creating thread.');
    }
};

const App = () => {
    const [reloadThreadList, setReloadThreadList] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    return (
        <div>
            <div id='threads'>
                <ThreadList 
                    threads={[]} 
                    reloadThreadList={reloadThreadList} 
                />
            </div>
            <div id='create-thread'>
                <form onSubmit={(e) => CreateThread(e, subpageName, reloadThreadList, setReloadThreadList, setStatusMessage)}>
                    <label htmlFor='threadName'>Thread Name:</label>
                    <input type='text' id='threadName' name='threadName' placeholder='Enter thread name' required />
                    <button type='submit'>Create Thread</button>
                </form>
            </div>
            {statusMessage && <div className="statusMessage">{statusMessage}</div>}
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;
