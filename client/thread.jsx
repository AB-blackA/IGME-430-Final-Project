const React = require('react');
const { createRoot } = require('react-dom/client');
const { useState, useEffect } = React;

const urlParts = window.location.pathname.split('/');
const threadName = urlParts[urlParts.length - 1];
const subPageName = urlParts[urlParts.length - 2];

const PostList = (props) => {
    const [postList, setPosts] = useState(props.posts);

    useEffect(() => {
        const getPostsFromServer = async () => {
            const response = await fetch(`/threadData?threadName=${threadName}&subPageName=${subPageName}`);
            const data = await response.json();
            setPosts(data.thread.entries);
        };
        getPostsFromServer();
    }, [props.reloadPostList]);

    if (postList.length === 0) {
        return (
            <div className='postList'>
                <h3 className='emptyList'>No Posts Found</h3>
            </div>
        );
    }

    const postNodes = postList.map((post) => (
        <div key={post.name} className='posts'>
            <h3 className='postName'>{post.name}</h3>
            <p>{post.content}</p>
        </div>
    ));

    return (
        <div className='postList'>{postNodes}</div>
    );
};

const createPost = async (event, threadName, reloadPostList, setReloadPostList, setStatusMessage) => {
    event.preventDefault();
    const form = event.target;
    const postContent = form.postContent.value.trim();

    if (!postContent) {
        setStatusMessage('Post content is required!');
        return;
    }
    

    const response = await fetch('/newPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            threadName,
            postContent,
        }),
    });

    if (response.ok) {
        setStatusMessage('Post created successfully!');
        setReloadPostList(!reloadPostList);
    } else {
        setStatusMessage('Error creating post.');
    }
};

const ThreadPage = () => {
    const [reloadPostList, setReloadPostList] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    return (
        <div>
            <div id='posts'>
                <PostList posts={[]} reloadPostList={reloadPostList} triggerReload={() => setReloadPostList(!reloadPostList)} />
            </div>
            <div id='create-post'>
                <form onSubmit={(e) => createPost(e, threadName, reloadPostList, setReloadPostList, setStatusMessage)}>
                    <label htmlFor='postContent'>Post Content:</label>
                    <textarea id='postContent' name='postContent' placeholder='Enter post content' required />
                    <button type='submit'>Create Post</button>
                </form>
            </div>
            {statusMessage && <div className="statusMessage">{statusMessage}</div>}
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<ThreadPage />);
};

window.onload = init;
