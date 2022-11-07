import { render, screen } from '@testing-library/react';
import data from './data.json';
import App from './App';

describe('Pruebas en <App />', () => {

  beforeAll(()=>jest.spyOn(window, 'fetch'))

  // test('Should show a list of characters including Luke Skywalker', () => {
  //   render(<App />);
  //   expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  // });

  // test('should show a list of characters from a JSON file', () => {
  //   render(<App />);
  //   for(let character of data.results){
  //     expect(screen.getByText(character.name)).toBeInTheDocument();
  //   }
  // });

  test('should show a list of characters from the API', async() => {
    window.fetch.mockResolvedValueOnce({
      ok:true,
      json:async()=>data,
    });

    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith('http://swapi.dev/api/people/');

    for(let character of data.results){
      expect(await screen.findByText(character.name)).toBeInTheDocument();
    }
  })

  test('should show an error message when has a network error', async() => {
    window.fetch.mockResolvedValueOnce(new Error("Network error"));
    render(<App />);
    expect( await screen.findByText("Network error")).toBeInTheDocument();
  })
})

