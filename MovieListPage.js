
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function MovieListPage() {

    const [searchTerm, setSearchTerm] = useState('')
    const [movies, setMovies] = useState([])
    const [noMoviesFound, setNoMoviesFound] = useState(false)
    useEffect(() => {
        // get movie name from local storage 
        let term = localStorage.getItem("searchTerm")
        if(term) {
          fetchMovies(term)
        }
    },[])

    const handleSearchTermChange = (e) => {
setSearchTerm(e.target.value)
    }

    const clearResults = () => {
        setMovies([])
        setSearchTerm('')
        localStorage.removeItem("searchTerm")
    }

    const fetchMovies = (movieName) => {

        const searchURL = `http://www.omdbapi.com/?s=${movieName}&page=2&apikey=564727fa`

        // put movie name in local storage 
        localStorage.setItem("searchTerm", movieName)

        fetch(searchURL)
        .then(response => response.json())
        .then(result => {

            if(result.Error) {
                 setMovies([])
                setNoMoviesFound(true)
            } else {
                setMovies(result.Search)
                setNoMoviesFound(false)
            }
        })

    }

    const movieItems = movies.map(movie => {
        return (
            <div key={movie.imdbID}>
                <div class="col">
          <div class="card shadow-sm">
            <svg width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                <img src = {movie.Poster == "N/A" ?"/missingmovie.jpg" : movie.Poster } class="bd-placeholder-img card-img-top" />
                <div class="card-body">
                    <h2>{movie.Title}</h2>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                                    <NavLink to = {`/${movie.imdbID}`}>
                                   <button type="button" class="btn btn-sm btn-outline-secondary">Details</button>
                                   </NavLink>
                        </div>
                        <small class="text-muted">{movie.Year}</small>
                    </div>
                </div>
            </div>
        </div>
                
                <NavLink to = {`/${movie.imdbID}`}>
                    <button>Details</button>
                </NavLink>
            </div>
        )
    })

    return (
        <div>
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
      <             div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Movie Search</h1>
                        <p class="lead text-muted">We want to help you find the bets movie you can think of. Start Search and see for yourself.</p>
                        <p>
                        <p>
                        <input type = "text" onChange = {handleSearchTermChange} />
                        </p>
                        <button onClick={() => fetchMovies(searchTerm)} class="btn btn-primary my-2">Search</button>
                        <button onClick = {clearResults} class="btn btn-secondary my-2">Clear Results</button>
                        </p> 
                    </div>
                </div>
              
            </ section>
        </div>
)}

export default MovieListPage 