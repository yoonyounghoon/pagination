import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Posts from "./Posts";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(async () => {
    setLoading(true);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setPosts(response.data);
    setLoading(false);
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  console.log(posts);
  return (
    <div className="App">
      <Posts posts={currentPosts(posts)} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default App;
