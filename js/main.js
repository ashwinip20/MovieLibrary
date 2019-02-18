API_KEY = '2a7f8b223a68f3f546c6bc93aa902101';
$(document).ready(() => {
    $("#searchForm").on("submit", (e) => {
        let SearchedText = $("#searchText").val();
        FetchMovies(SearchedText);
        e.preventDefault();
    });
});

function FetchMovies(SearchedText) {
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&language=en-US&query=" + SearchedText + "&page=1&include_adult=false")
        .then((response) => {
            console.log(response.data.results[0]);
            let movies = response.data.results;
            let result = "";
            let count = 0;
            $.each(movies, (i, movie) => {
                if(count<10)
                {
                    console.log('In FetchMovies',movies[i],movies[i].poster_path);
                     result += `
        <div class="firstdiv">
          <div class="well text-center">
            <img src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" class="thumbnail">
            <a class="" onclick="movieSelected(${movies[i].id})" href="#">
            <h5 class='styleIt'>${movies[i].title}</h5></a><h3>
            <span class='ReleaseYearStyle'>${movie.release_date.substr(0,4)}</span>
          </div>
        </div>
      `;
                }
                count++;
               
            });
            $("#movies").html(result);
        })
        .catch((err) => {
            console.log(error);
        });
}

function movieSelected(id) {
    sessionStorage.setItem("movieId", id);
    window.location = "MovieDetail.html";
    return false;
}

function FetchMovie() {
    let movieId = sessionStorage.getItem("movieId");

    axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=5961ee750912881d005267d938745ff3")
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let result = `
      <div id='dilog' class="row">
          <div class="">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
          </div>
          <div class="panel">
            <h3>${movie.original_title}</h3>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
              <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} min.</li>
            </ul>
          </div>
        </div>
        <div class="DescriptionRow">
          <div class="well">
            <h3>Description</h3>
            ${movie.overview}
            <hr>
            <a href="index.html" class=""><i class="fas fa-chevron-circle-left"></i> Go Back</a>
          
          </div>
        </div>
    `;

            $("#movie").html(result);
        })
        .catch((err) => {
            console.log(err);
        });
}

function FetchAllMovies() {
    axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=" + API_KEY + '&language=en-US&page=1&region=US')

        .then((response) => {
            console.log(response.data.results[0]);
            let movies = response.data.results;
            let result = "";
            let count = 0;
            $.each(movies, (i, movie) => {
                if(count<10)
                {
                result += `
        <div class="firstdiv">
          <div class="well text-center">
            <img src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" class="thumbnail">
            <a class="" onclick="movieSelected(${movies[i].id})" href="#">
            <h5 class='styleIt'>${movies[i].title}</h5></a>
            <span class='ReleaseYearStyle'>${movie.release_date.substr(0,4)}</span>
          </div>
        </div>
      `;}
            count++;
            });
            $("#movies").html(result);
        })
        .catch((err) => {
            console.log(error);
        });
}
FetchAllMovies();