import {useState, useEffect} from "react";
import axios from "axios";
import AppPost from "./component/AppPost";
const apiUrl = import.meta.env.VITE_API_URL

const initialForm = {
  title: "",
  image: "",
 }


 //importo API
//  const importApi = "http://localhost:3000";

function App() {

  const [activeArticles, setActiveArticles] = useState([]);
  const [formData, setFormData] = useState(initialForm);


//post axios
const getPosts = () => {
  axios.get(`${apiUrl}/bacheca`).then((resp) => {
    console.log(resp);
    setActiveArticles(resp.data.posts)
  })
}

//USE EFFECT
useEffect(() => {
  getPosts();
}, []);

  //funzione per aggiungere un nuovo articolo
  const handleArticlesForm = (event) => {
    event.preventDefault()

    axios.post(`${apiUrl}/posts`, formData).then((resp) => {
      const newArray = [
          ...activeArticles,
          resp.data
      ];
      setActiveArticles(newArray);
      setFormData(initialForm)
  })
 };


//funzione input
const handleInputChange = (event) => {
  const keyToChange = event.target.name;
  const newValue = event.target.value;

  setFormData((prevData) => ({
    ...prevData,
    [keyToChange]: newValue,
  }));
}

//funzione delete
const handleDelete = (idDaCancellare) => {
  axios.delete(`${apiUrl}/posts/${idDaCancellare}`).then((resp) => {
    const newArray = activeArticles.filter(
      (curPost) => curPost.id !== idDaCancellare
    );
    setActiveArticles(newArray);
  });
};


  return (
    <>
      <div className="container">
        <h2 className="text-center text-secondary my-3 fs-1">New articles</h2>
        {activeArticles.length > 0 ? (
          <div className="display">
            <div className="card">
            {activeArticles.map((curItem) => (<div key={curItem.id}>
              <AppPost post = {curItem}/>
              <button onClick={() => handleDelete(curItem.id)} className='btn btn-outline-secondary m-3'>Delete</button>
              </div>
              ))}
              </div>
          </div>
          
        ) : (
          <p className="text-secondary">There are currently no articles</p>
        )}
       
       {/* FORM */}

       {/*Title*/}
        <h2 className="text-secondary mb-3">Insert a new article here</h2>
        <form action="" onSubmit={handleArticlesForm}>
          <div className="mb-3">
            <label htmlFor="title" className="text-secondary"><strong>Enter title</strong></label>
            <input className="form-control" id="title" type="text"
            name="title" value={formData.title} onChange={handleInputChange} />
          </div>

         {/*Image*/}
            <div className="mb-3">
              <label htmlFor="image" className="text-secondary fw-bold me-2">Image</label>
              <input id="image" type="text" name="image" value={formData.image}
              onChange={handleInputChange}
              />
            </div>
           <button type="submit" className="btn btn-secondary mt-3">Add Article</button>
        </form>
      </div>
    </>
  )
}

export default App


