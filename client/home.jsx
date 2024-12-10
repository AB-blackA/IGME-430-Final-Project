const helper = require('./helper.js');
const React = require('react');
const { createRoot } = require('react-dom/client');
const { useState, useEffect } = React;


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
// this is for the form that a user could use to add a sub to the forum
/* <div id='makeSub'>
               <SubPageForm triggerReload={() => setReloadSubPageList(!reloadSubPageList)} />
            </div> */

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init();