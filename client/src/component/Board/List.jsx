const List = ({ posts }) => {
  return (
    <ul>
      {posts &&
        posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
    </ul>
  );
};

export default List;
