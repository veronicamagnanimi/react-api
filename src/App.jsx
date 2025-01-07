import {useState, useEffect} from "react";
import axios from "axios";

const initialForm = {
  title: "",
  image: "",
 }


 //importo API
 const importApi = "http://localhost:3000";

function App() {

  const [activeArticles, setActiveArticles] = useState([]);
  const [formData, setFormData] = useState(initialForm);


//post axios
const getPosts = () => {
  axios.get(`${importApi}/bacheca`).then((resp) => {
    console.log(resp);
    setActiveArticles(resp.data.bacheca)
  })
}

//USE EFFECT
useEffect(() => {
  getPosts();
}, []);

  //funzione per aggiungere un nuovo articolo
  const handleArticlesForm = (event) => {
    event.preventDefault()

  axios.post(`${importApi}/bacheca`, formData).then((resp) => {
    console.log(resp.data);

   //aggiungo il nuovo articolo all'elenco
   setActiveArticles((prevArticles) => [...prevArticles, resp.data]);

   //resetto i campi
   setFormData(initialForm);
 })
 };




// FUNZIONE INPUT
const handleInputChange = (event) => {
  const keyToChange = event.target.name;
  const newValue = event.target.value;

  setFormData((prevData) => ({
    ...prevData,
    [keyToChange]: newValue,
  }));
}


  return (
    <>
      <div className="container">
        <h2 className="text-center text-secondary my-3 fs-1">New articles</h2>
        {activeArticles.length > 0 ? (
          <div>
            {activeArticles.map((curItem) => (<div key={curItem.id}>
                <h4>{curItem.title}</h4>
                <img src={`${importApi}/${curItem.image}`} alt={curItem.title} />
              </div>
              ))}
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
