import {useEffect, useState} from "react";

const initalForm = {
  title: "",
  description: "",
  author: "",
  image: "",
  category: "", //select
  published: false
}

function App() {

  const [activeArticles, setActiveArticles] = useState([]);
  const [formData, setFormData] = useState(initalForm);

  const [publishedMessage, setPublishedMessage] = useState("");

  //USE EFFECT
  useEffect(() => {
    if (formData.published) {
      setPublishedMessage("Article visible")
     } else {
       setPublishedMessage("Article not visible")
     }
   
  }, [formData.published])


  //FUNZIONE EVENTO BOTTONE
  const handleArticlesForm = (event) => {
    event.preventDefault()

  //creo l'oggetto del nuovo articolo
  const newArticle = {
    ...formData,
    id: Date.now()
  }

  //CONTROLLO SUL BOTTONE
   if( !formData.author || !formData.author) {
    alert("Fin in all fields");
    return
   }

    const newArray = [...activeArticles, newArticle];
    setActiveArticles(newArray);
    
  //resetta i campi
    setFormData({...initalForm});

 
 };

 // FUNZIONE RIMUOVI ARTICOLO
  const removeElem = (removeArticle) => {
    const secondArray = activeArticles.filter((curItem) => curItem.id !== removeArticle.id)
    setActiveArticles(secondArray)
  } 


// FUNZIONE INPUT
const handleInputChange = (event) => {
  const keyToChange = event.target.name;
  const newValue = event.target.value;

  const newDataForm = {
    ...formData, 
    [keyToChange]: newValue,
  };
  setFormData(newDataForm)
}


  return (
    <>
      <div className="container">
        <h2 className="text-center text-secondary my-3 fs-1">New articles</h2>
        {activeArticles.length > 0 ? (
          <div>
            {activeArticles.map((curItem) => (<div key={curItem.id}>
                <h4>{curItem.title}</h4>
                <h5>{curItem.author}</h5>
                <p>{curItem.description}</p> <span>{curItem.category}</span>
                <button onClick={() => {removeElem(curItem)}}>🗑️</button>
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
            name="title" value={formData.name} onChange={handleInputChange} />
          </div>

         {/*Author*/}
          <div className="mb-3">
            <label htmlFor="author" className="text-secondary"><strong>Enter author</strong></label>
            <input type="text" id="author" className="form-control"
            name="author" value={formData.author}
              onChange={handleInputChange}/>
          </div>
         
         {/*Description*/}
          <div className="mb-3">
            <label htmlFor="description" className="text-secondary"><strong>Enter description</strong></label>
            <input type="text" id="description" className="form-control"
            name="description" value={formData.description}
              onChange={handleInputChange}/>
          </div>
          
          {/*Category*/}
          <div className="mb-3">
          <select className="form-select text-secondary fw-bold" aria-label="Default select example" name="category"
           value={formData.category} onChange={handleInputChange}>
           <option selected>Category</option>
          <option value="Category 1">One</option>
          <option value="Category 2">Two</option>
          <option value="Category 3">Three</option>
         </select>
          </div>
         
         {/*Published*/}
          <div className="mb-3">
              <label htmlFor="published" className="text-secondary fw-bold me-2">Published</label>
              <input id="published" type="checkbox" name="published" checked={formData.published}
              onChange={handleInputChange}
              />
              <div>{publishedMessage}</div>
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
