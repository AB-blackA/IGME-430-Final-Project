/* Author: Andrew Black
 * Since: 12/3/24
 * home.jsx is the script page that works for the home page. It gathers subpages and allows
 * for the creation of them
 */

const helper = require('./helper.js');
const React = require('react');
const { createRoot } = require('react-dom/client');
const { useState, useEffect } = React;

// this is what displays the subpages
const SubPageList = (props) => {
    const [subPageList, setPages] = useState(props.subpages);

    useEffect(() => {
        const getSubPagesFromServer = async () => {
            const response = await fetch('/getSubPageList');
            const data = await response.json();
            setPages(data.subPageNames);
        };

        getSubPagesFromServer();
    }, [props.reloadSubPageList]); 

    if (subPageList.length === 0) {
        return (
            <div className='subPageList'>
                <h3 className='emptyList'>No SubPages Found</h3>
            </div>
        );
    }

    const subPageNodes = subPageList.map(subPage => {
        const url = `/subPage/${subPage}`;  

        return (
            <div key={subPage} className='subs'>
                <a href={url} className='subpageName'>{subPage}</a>
            </div>
        );
    });

    return (
        <div className='subPageList'>
            {subPageNodes}
        </div>
    );
};

// this is the form for creating one.
const CreateSubPage = async (event, reloadSubPageList, setReloadSubPageList, setStatusMessage) => {
    event.preventDefault();
    const form = event.target;
    const subPageName = form.subPageName.value.trim();

    if (!subPageName) {
        setStatusMessage('Subpage name is required!');
        return;
    }

    const response = await fetch('/newSubPage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subPageName }),
    });

    if (response.ok) {
        setStatusMessage('Subpage created successfully!');
        setReloadSubPageList(prev => !prev); 
    } else {
        setStatusMessage('Error creating subpage.');
    }
};

const App = () => {
    const [reloadSubPageList, setReloadSubPageList] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    return (
        <div>
            <div id='subs'>
                <SubPageList subpages={[]} reloadSubPageList={reloadSubPageList} />
            </div>
            <div id='makeSub'>
                <form onSubmit={(e) => CreateSubPage(e, reloadSubPageList, setReloadSubPageList, setStatusMessage)}>
                    <label htmlFor='subPageName'>Subpage Name:</label>
                    <input type='text' id='subPageName' name='subPageName' placeholder='Enter subpage name' required />
                    <button type='submit'>Create Subpage</button>
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
