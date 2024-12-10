const React = require('react');
const { createRoot } = require('react-dom/client');
const { useState, useEffect } = React;

const urlParts = window.location.pathname.split('/');
const threadName = urlParts[urlParts.length - 1];
const subPageName = urlParts[urlParts.length - 2];

const PostList = (props) => {
    console.log("PostList props:", props);
    const [postList, setPosts] = useState(props.posts);

    useEffect(() => {
        const getPostsFromServer = async () => {
            const response = await fetch(`/threadData?threadName=${threadName}&subPageName=${subPageName}`);
            const data = await response.json();

            console.log('next print is for the data');
            console.log(data);
            console.log('this is after the data print');

            setPosts(data.posts);
        };
        getPostsFromServer();
    }, [threadName.reloadPostList]);

    console.log('postList' + postList);

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

const createPost = async (event, threadName, reloadPostList, setReloadPostList) => {
    event.preventDefault();
    const form = event.target;
    const postContent = form.postContent.value.trim();

    if (!postContent) {
        alert('Post content is required!');
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
        alert('Post created successfully!');
        setReloadPostList(!reloadPostList);
    } else {
        alert('Error creating post.');
    }
};

const ThreadPage = () => {
    const [reloadPostList, setReloadPostList] = useState(false);

    return (
        <div>
            <div id='posts'>
                <PostList posts={[]} reloadPostList={reloadPostList} triggerReload={() => setReloadPostList(!reloadPostList)} />
            </div>
            <div id='create-post'>
                <form onSubmit={(e) => createPost(e, threadName, reloadPostList, setReloadPostList)}>
                    <label htmlFor='postContent'>Post Content:</label>
                    <textarea id='postContent' name='postContent' placeholder='Enter post content' required />
                    <button type='submit'>Create Post</button>
                </form>
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<ThreadPage />);
};

window.onload = init;
