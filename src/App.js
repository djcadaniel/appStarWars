import { useEffect, useRef, useState } from 'react';
import { getCharacter, getPeople, getSearchCharacter } from './api/people';
import './App.css';

function App() {

  const [people, setPeople] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(1)
  const [errorState, setErrorState] = useState({hasError:false});
  const [details, setDetails] = useState({});
  const [textSearch, setTextSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPeople(page)
      .then(setPeople)
      .catch(handleError);
  }, [page]);


  useEffect(() => {
    getCharacter(currentCharacter)
      .then(setDetails)
      .catch(handleError)
  }, [currentCharacter])
  
  
  const handleError = (err)=>{
    setErrorState({
      hasError : true,
      message: err.message
    })
  }

  const showDetails =(character)=>{
   const id = Number(character.url.split('/').slice(-2)[0]);
   setCurrentCharacter(id);
  }

  const inputSearch = useRef();

  const onChangeTextSearch =(event)=>{
    event.preventDefault();
    const text = inputSearch.current.value;
    setTextSearch(text);
  }

  const onSearchSubmit =(event)=>{
    if(event.key !== 'Enter') return;
    inputSearch.current.value = '';
    setDetails({});
    getSearchCharacter(textSearch)
      .then(setPeople)
      .catch(handleError)
  }

  const onChangePage =(next)=>{
    if(!people.previous && page + next <= 0) return;
    if(!people.next && page + next >= 9) return;

    setPage(page + next)
  }

  return (
    <>
      <input 
        type='text'
        placeholder='Buscar un personaje'
        ref = {inputSearch}
        onChange = {onChangeTextSearch}
        onKeyDown = {onSearchSubmit}
      />
      <div>
        {errorState.hasError && <div>{errorState.message}</div> }
        {people?.results?.map(character =>(
          <ul key={character.name}>
            <li onClick={()=>showDetails(character)}>{character.name}</li>
          </ul>
        ))}
      </div>
      <section>
        <button onClick={()=>onChangePage(-1)} >Prev</button>| {page} |
        <button onClick={()=>onChangePage(1)}>Next</button>
      </section>
      {
        details && (
          <aside>
            <h1>{details.name}</h1>
            <img src={`https://starwars-visualguide.com/assets/img/characters/${currentCharacter}.jpg`} alt={details.name} />
            <ul>
              <li>Altura: {details.height}</li>
              <li>Masa: {details.mass}</li>
              <li>Nacimiento: {details.birth_year}</li>
            </ul>
          </aside>
        )
      }
    </>
  );
}

export default App;
