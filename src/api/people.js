export const getPeople = async(page)=>{
  try{
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    if(!response.ok){
      throw new NetworkError();
    }
    const data = await response.json();
    console.log(data);
    return data;
  }catch(err){
    throw err;
  }
}

class NetworkError extends Error{
  constructor(){
    super("Network error");
  }
}

export const getCharacter = async(id=1)=>{
  const response = await fetch(`https://swapi.dev/api/people/${id}/`);
  const data = response.json();
  return data;
}

export const getSearchCharacter = async(name) =>{
  const response = await fetch(`https://swapi.dev/api/people/?search=${name}`);
  const data = await response.json();
  return data;
}