const apiUrl = import.meta.env.VITE_API_URL

const AppPost = ({post}) => {
    
    return (
        <div className="col-lg-3">
        <h4>{post.title}</h4>
        <img src={`${apiUrl}/${post.image}`} alt={post.title} />
        <div>{post.tags && post.tags.map((curTag, index) => 
        <span key={index}>{curTag}</span>)}</div>
        
        </div>
    )
}

export default AppPost;