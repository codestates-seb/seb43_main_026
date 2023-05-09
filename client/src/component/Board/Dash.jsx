const Dash = ({ posts }) => {
  return (
    <ul>
      {posts &&
        posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
    </ul>
  );
};

export default Dash;
