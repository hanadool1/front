(function() {
    const $listingCardList = document.querySelector('.listing-card__list');
    let page = 1;
    let timer = null;
    window.addEventListener('scroll', function() {
        if(!timer) {
            timer = setTimeout(function() {
                timer = null;
                const {
                    scrollTop,
                    scrollHeight,
                    clientHeight
                } = document.documentElement;
                if (scrollTop + clientHeight >= scrollHeight - 5) {
                    itemLength = 0;
                    getData();
                }
            }, 200);
        }
    });
    function getData() {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzJjNmIwYjlhYWQxMzEyYzlkYWY3MmZmZWYzYmM3MiIsInN1YiI6IjYxZmNlOGY3N2E5N2FiMDA0N2U2ZTMzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Skjv6dYxa7qjdxWSz1tJVMH151T2WMNp4pzuursIeYw'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page++}&sort_by=popularity.desc`, options)
            .then(response => response.json())
            .then(res => {
                procList(res.results);
            })
            .catch(err => console.error(err));
    }

    function procList(data) {
        data.forEach(item => {
            const view = makeView(item);
            $listingCardList.append(view);
        });
    }

    function makeView(item) {
        const poster = `https://image.tmdb.org/t/p/original/${item.poster_path}`;
        const li = document.createElement('li');
        li.className = 'listing-card__item';
        li.innerHTML = `
            <div class="listing-card__image" style="background-image:url('${poster}')">
                            </div>
                            <div class="listing-card__info">
                                <strong class="listing-card__name">${item.title}</strong>
                                <p class="listing-card__date">${item.release_date}</p>
                            </div>
        `;
        return li;
    }

    getData();
    

})();