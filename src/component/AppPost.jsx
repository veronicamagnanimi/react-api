const apiUrl = import.meta.env.VITE_API_URL

const AppPost = ({post}) => {
    
    return (
        <div>
        <h4>{post.title}</h4>
        <img src={`${apiUrl}/${post.image}`} alt={post.title} />
        
        </div>
    )
}

export default AppPost;