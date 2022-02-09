
import { useEffect, useState } from 'react'

function MovieDetailPage(props) {

    const [movieDetail, setMovieDetail] = useState({})

    useEffect(() => {

        const imdbId = props.match.params.imdbId
        fetchMovieDetailsById(imdbId)
    }, [])

    const fetchMovieDetailsById = (imdbId) => {

        const movieDetailsURL = `http://www.omdbapi.com/?i=${imdbId}&apikey=564727fa`

        fetch(movieDetailsURL)
        .then(response => response.json())
        .then(result => {
            setMovieDetail(result)
        })

    }


    return (
        <div>
            <div class="container ">
                <div class="row justify-content-center">
                    <div class="col mt-3">
                        <div class = "text-center">
                           <img src={movieDetail.Poster} />
                            <h1>{movieDetail.Title}</h1>
                            </div>
<table class="table table-hover">
  <tbody>
    <tr>
      <th scope="row">Plot</th>
      <td>{movieDetail.Plot}</td>
                                </tr>
                                <tr>
      <th scope="row">Released</th>
      <td>{movieDetail.Released}</td>
    </tr><tr>
      <th scope="row">Director</th>
      <td>{movieDetail.Director}</td>
    </tr><tr>
      <th scope="row">Writer</th>
      <td>{movieDetail.Writer}</td>
                                </tr>
                                <tr>
      <th scope="row">Actors</th>
      <td>{movieDetail.Actors}</td>
    </tr><tr>
      <th scope="row">Awards</th>
      <td>{movieDetail.Awards}</td>
    </tr>
  </tbody>
</table>
            <p>{movieDetail.Plot}</p>
            <p>Released: {movieDetail.Released}</p>
            <p>Director: {movieDetail.Director}</p>
            <p>Writer: {movieDetail.Writer} </p>
            <p>Writer: {movieDetail.Actors} </p>
            <p>Writer: {movieDetail.Awards} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailPage 