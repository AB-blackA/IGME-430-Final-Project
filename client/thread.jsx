/* Author: Andrew Black
 * Since: 12/3/24
 * thread.jsx is the script page that works for the thread page. It gathers the posts and allows
 * for the creation of them. However, it doesn't seem to work as
 */

const React = require('react');
const { createRoot } = require('react-dom/client');
const { useState, useEffect } = React;

// gather params for routing
const urlParts = window.location.pathname.split('/');
const threadName = urlParts[urlParts.length - 1];
const subPageName = urlParts[urlParts.length - 2];

// get posts (doesn't work)
const PostList = (props) => {
    const [postList, setPosts] = useState(props.posts);

    useEffect(() => {
        const getPostsFromServer = async () => {
            const response = await fetch(`/threadData?threadName=${threadName}&subPageName=${subPageName}`);
            const data = await response.json();
            console.log(data);
            setPosts(data.thread.entries.map((entry) => entry.entries));
        };
        getPostsFromServer();
    }, [props.reloadPostList]);

    console.log(`postList: ${postList}`);

    if (postList.length === 0) {
        return (
            <div className='postList'>
                <h3 className='emptyList'>No Posts Found</h3>
            </div>
        );
    }

    const postNodes = postList.map((post) => (
        <div key={post.id} className='posts'>
            <h3 className='postName'>{post.id}</h3>
            <p>{post.content}</p>
        </div>
    ));
    

    return (
        <div className='postList'>{postNodes}</div>
    );
};

// make posts (works, but you wouldn't know if you're the user)
const CreatePost = async (event, threadName, reloadPostList, setReloadPostList, setStatusMessage) => {
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
                <form onSubmit={(e) => CreatePost(e, threadName, reloadPostList, setReloadPostList, setStatusMessage)}>
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
