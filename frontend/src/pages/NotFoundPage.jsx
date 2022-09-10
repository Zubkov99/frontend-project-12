import {Link} from "react-router-dom";
import React from "react";

const NotFoundPage = () => {
    return (
        <>
            <h1>Not Found!</h1>
            <Link to="/">Go to main</Link>
        </>
    )
}

export default NotFoundPage;