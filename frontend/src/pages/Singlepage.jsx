import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

const Singlepage = () => {
    const [post, setPost] = useState(null);
    const {id} = useParams();
    useEffect( () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
    },[id])
    return (
        <div>
            {post && (
              <>
                  <h1>{post.title}</h1>
                  <p>{post.body}</p>
              </>
            )}
        </div>
    )
}

export default Singlepage;