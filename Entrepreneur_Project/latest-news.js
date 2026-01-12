const url = 'https://newsapi.org/v2/top-headlines?q=pc&apiKey=de2463555ed34d0baf4ac2d0339397fc';

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Process the data and display the news articles
    const articles = data.articles;
    const newsContainer = document.getElementById('news-container');

    articles.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('card', 'mb-3');

      const imageElement = document.createElement('img');
      imageElement.classList.add('card-img-top');
      imageElement.src = article.urlToImage;

      const bodyElement = document.createElement('div');
      bodyElement.classList.add('card-body');

      const titleElement = document.createElement('h2');
      titleElement.classList.add('card-title');
      titleElement.textContent = article.title;

      const descriptionElement = document.createElement('p');
      descriptionElement.classList.add('card-text');
      descriptionElement.textContent = article.description;

      const urlElement = document.createElement('a');
      urlElement.classList.add('btn', 'btn-primary');
      urlElement.textContent = 'Read more';
      urlElement.href = article.url;
      urlElement.target = '_blank';

      bodyElement.appendChild(titleElement);
      bodyElement.appendChild(descriptionElement);
      bodyElement.appendChild(urlElement);

      articleElement.appendChild(imageElement);
      articleElement.appendChild(bodyElement);

      newsContainer.appendChild(articleElement);
    });
  })
  .catch(error => console.error(error));