const helper = require('./helper.js');
const React = require('react');
const { createRoot } = require('react-dom/client');
const { useState, useEffect } = React;


const SubPageList = (props) => {
    const [subPageList, setPages] = useState(props.subpages);

    useEffect(() => {
        const getSubPagesFromServer = async () => {
            const response = await fetch('/getSubPageList');
            console.log(`response: ${response}`);
            const data = await response.json();
            setPages(data.subpages);
        };
        getSubPagesFromServer();
    }, [props.reloadSubPageList]);

    console.log(`subPageList: ${subPageList}`);

    if (subPageList.length === 0) {
        return (
            <div className='subPageList'>
                <h3 className='emptyList'>No SubPages Found</h3>
            </div>
        );
    }

    const subPageNodes = subPageList.map(subPage => {
        return (
            <div key={subPage.name} className='subs'>
                <img src='/assets/img/face.png' alt='thread pic' className='threadPic' />
                <h3 className='threadName'>Name: {subPage.name}</h3>
            </div>
        );
    });

    return (
        <div className='subPageList'>
            {subPageNodes}
        </div>
    );
};

// App was slightly modified to add the triggerReload to DomoList so it would
// update on deletion
const App = () => {
    const [reloadSubPageList, setReloadSubPageList] = useState(false);

    return (
        <div>
            <div id='subs'>
                <SubPageList subpages={[]} reloadSubPageList={reloadSubPageList} triggerReload={() => setReloadSubPageList(!reloadSubPageList)} />
            </div>

        </div>
    );
}
// this goes right below the div for SubPageList
/* <div id='makeSub'>
               <SubPageForm triggerReload={() => setReloadSubPageList(!reloadSubPageList)} />
            </div> */

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init();