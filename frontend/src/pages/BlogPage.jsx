import React from "react";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

const BlogPage = () => {
    const [post, setPost] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setPost(data))
    }, [])
    return (
        <div>
            <h1>Our posts</h1>
            {
                post.map(item => {
                   return (
                       <Link key={item.id} to={`/posts/${item.id}`}>
                           <li>{item.title}</li>
                       </Link>
                   )
                })
            }
        </div>
    )
}
export default BlogPage;