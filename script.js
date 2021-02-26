// DOM VARIABLES 
const mainBody = document.querySelector('body')
const mainContainer = document.querySelector('.container')
const newsContainer = document.getElementById('news-container')
const topRow = document.getElementById('top-row')
const middleRow = document.getElementById('middle-row')
const bottomRow = document.getElementById('bottom-row')
const buttons = document.getElementsByTagName('button')
const mostPopBtn = document.getElementById('most_pop')
const searchBtn = document.getElementById('search-button')
const searchWord = document.getElementById('search-word')
const searchField = document.getElementById('searchInputField')

// --------------------------------------------------------------
// Play the loader screen with Logo on window load
var loaderScreen = document.querySelector(".loader");
// When the window is loaded....
window.addEventListener("load", function() {  
  if(document.cookie.indexOf("visited=true") === -1) {
    mainContainer.classList.add("hidden");    
    loaderScreen.classList.remove("hidden");
    logoAnimation()
    setTimeout(function(){
      loaderScreen.classList.add("hidden");      
      mainContainer.classList.remove("hidden");
    }, 4000);
  } 
});

// --------------------------------------------------------------
// FUNCTION FOR THE MOST READ ARTICLE OF THE MOMENT, PER SOURCE
function singleMostReadArticleDOMnodes() {
  // CONTAINER DIV
  const singleMostReadItem = document.createElement('div')
  singleMostReadItem.classList.add('single-most-read')
  // OVERLAYS CONTAINING LOGOS, HEADLINES AND LINKS
  const articleOverlay = document.createElement('overlay')
  articleOverlay.classList.add('single-most-read-overlay')
  const contentDetails = document.createElement('p')
  contentDetails.classList.add('content-details', 'fadeIn-bottom')
  // ARTICLE TITLES
  const mostReadTitle = document.createElement('p')
  mostReadTitle.textContent = mostReadArticlesArray[0].webTitle || mostReadArticlesArray[0].title
  mostReadTitle.classList.add('overlay-headline')
  // ARTICLE LINKS
  const link = document.createElement('a')
  if (mostReadArticlesArray[0].url) {
    link.href = mostReadArticlesArray[0].url
  } else {
    link.href = mostReadArticlesArray[0].webUrl  
  }
  link.title = 'Read Full Article' // Info when hovering on image
  link.target = '_blank' // OPEN ARTICLE IN NEW TAB
  // ARTICLE PICTURES
  const singleMostReadPicture = document.createElement('img')
  singleMostReadPicture.classList.add('single-most-read-picture')
  if (mostReadArticlesArray[0].fields) {
    singleMostReadPicture.src = mostReadArticlesArray[0].fields.thumbnail
  } else if (mostReadArticlesArray[0].media[0]) {
    singleMostReadPicture.src = mostReadArticlesArray[0].media[0]['media-metadata'][2].url
  } else {
    singleMostReadPicture.src = './newspapers.jpg'
  }
  // COMPANY LOGOS
  const logo = document.createElement('img')
  logo.classList.add('overlay-logo')
  logo.loading = 'lazy'
  if (mostReadArticlesArray[0].webUrl) {
    logo.src = './the-guardian.png'
    logo.alt = 'The Guardian Logo'
  } else {
    logo.src = './NYTimesLogo.png'
    logo.alt = 'New York Times Logo' 
  }
  // CONNECT ALL DOM NODES
  link.appendChild(mostReadTitle)
  contentDetails.append(logo, link)
  articleOverlay.append(contentDetails)
  singleMostReadItem.append(singleMostReadPicture, articleOverlay)
  topRow.append(singleMostReadItem)
  newsContainer.append(topRow)
}

// BUILD DOM NODES FOR EACH NYT PER_FACET
function keyPersonalities() {
  const keyContainers = document.createElement('div')
  keyContainers.classList.add('key-containers')  
  middleRow.append(keyContainers) 
  newsContainer.append(middleRow)

  mostReadArticlesArray.forEach(item => {    
    if (item.per_facet.length < 1) {
        return 
      } else {
        const perFacet = document.createElement('button')
        perFacet.classList.add('perFacet-buttons')        
        perFacet.textContent = item.per_facet[0]
        perFacet.setAttribute('onClick', `searchKeyPersonalities('${item.per_facet[0]}')`)
        keyContainers.append(perFacet) 
      }
  })
}

// PASS PER_FACET VALUE TO FUNCTIONS
function searchKeyPersonalities(perFacet) {
  let searchWord = perFacet
  keyNYTPersonalityFetch(searchWord)
  setTimeout(() => {
    keyGuardianPersonalityFetch(searchWord)
  }, 100)
}

// SCROLLBAR - FUNCTION FOR THE MOST READ ARTICLES OF THE DAY, STARTING WITH THE SECOND MOST READ
function mostReadArticlesToday() {  
  mostReadArticlesArray.slice(1, 20).forEach(item => {
    // console.log('mostReadArticlesArray: ', mostReadArticlesArray)
    const allMostReadToday = document.createElement('div')
    allMostReadToday.classList.add('all-most-read-today')
    // ARTICLE LINKS
    const link = document.createElement('a')
    if (item.url) {
      link.href = item.url
    } else {
      link.href = item.webUrl  
    }
    link.title = 'Read Full Article' // Info when hovering on image
    link.target = '_blank' // OPEN ARTICLE IN NEW TAB
    // ARTICLE PICTURE
    const mostReadPicture = document.createElement('img')
    mostReadPicture.loading = 'lazy'
    mostReadPicture.classList.add('most-read-pictures')
    if (item.fields) {
      mostReadPicture.src = item.fields.thumbnail
    } else {
      mostReadPicture.src = item.media[0]['media-metadata'][2].url
    }
    // CONNECT THE DOM NODES
    link.append(mostReadPicture)
    allMostReadToday.append(link)
    bottomRow.append(allMostReadToday)
    newsContainer.appendChild(bottomRow)
  })
}

// --------------------------------------------------------------
// TOP HEADLINES BUTTON
mostPopBtn.addEventListener('click', () => {
  clearArticles()
  fetchNYTarticles()
  setTimeout(() => {
    fetchGarticles()
  }, 100)  
})

// --------------------------------------------------------------
// DELETE DOM NODES FROM DIV: NEWSCONTAINER
function clearArticles() {
  topRow.innerHTML = ''
  middleRow.textContent = ''
  newsContainer.textContent = ''
  keyPersonalities.textContent = ''
}

// --------------------------------------------------------------
// SEARCH ARTICLES BY KEYWORDS in INPUT FIELD
searchField.addEventListener('submit', fetchSearchWord)

async function fetchSearchWord(e) {
  e.preventDefault()
  clearArticles()
  NYTsearchWords()
  setTimeout(() => {
    GsearchWords()
  }, 500)
}

// --------------------------------------------------------------
// CREATE TOP STORY DOM NODES
function allNewsCreateDOMnodes() {
  headlinesArray.forEach((article, i) => {
    // console.log('headlinesArray: ', headlinesArray)
    const newsItem = document.createElement('div')
    newsItem.classList.add('news-item')
    // NEWS COMPANY LOGOS
    const logo = document.createElement('img')
    logo.classList.add('logo')
    logo.loading = 'lazy'
    if (article.url || article.web_url) {
      logo.src = 'NYTimesLogo.png'
      logo.alt = 'New York Times Logo' // If image doesn't load, this message will display
    } else {
      logo.src = 'the-guardian.png'
      logo.alt = 'The Guardian Logo'
    }
    // LINK TO ARTICLES
    const link = document.createElement('a')
    if (article.url) {
      link.href = article.url           
    } else if (article.web_url) {
      link.href = article.web_url 
    } else {
      link.href = article.webUrl 
    }
    link.title = 'Read Full Article' // Info when hovering on image
    link.target = '_blank' // OPEN ARTICLE IN NEW TAB
    // ARTICLE IMAGES
    const picture = document.createElement('img')
    picture.loading = 'lazy'
    picture.classList.add('picture')

    // if (!article.multimedia[0].url) {
    //   picture.src = './newspapers.jpg' 
    // } else if (!article.multimedia[0].url.includes('https://')) {
    //   picture.src = 'https://static01.nyt.com/' + article.multimedia[0].url // NYT SEARCH
    // } else if (article.multimedia[0].url) { 
    //   picture.src = article.multimedia[0].url // NYT TOP HEADLINES
    // } else {
    //   picture.src = article.fields.thumbnail // THE GUARDIAN SEARCH AND TOP HEADLINES
    // }

    article.fields?.thumbnail ? picture.src = article.fields.thumbnail : picture.src = './newspapers.jpg'
    // article.multimedia[0] ? picture.src = article.multimedia[0].url : picture.src = './newspapers.jpg'

    
    // ARTICLE TITLES
    const headline = document.createElement('p')
    if (article.title) {
      headline.textContent = article.title
      headline.classList.add('NYheadline') 
    } else if (article.headline) {
      headline.textContent = article.headline.main
      headline.classList.add('NYheadline') 
    } else { 
      headline.textContent = article.webTitle
      headline.classList.add('Gheadline') 
    }
    // DATES
    const dateEl = document.createElement('strong')
    dateEl.classList.add('date')
    const format = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    if (article.webPublicationDate) {
      dateEl.textContent = new Date(article.webPublicationDate).toLocaleDateString(('en-GB'), format)
    } else if (article.pub_date) {
      dateEl.textContent = new Date(article.pub_date).toLocaleDateString(('en-GB'), format)
    } else {
      dateEl.textContent = new Date(article.published_date).toLocaleDateString(('en-GB'), format)
    }
    // TWEET A SINGLE ARTICLE
    const twitterBtn = document.createElement('a')
    twitterBtn.classList.add('fab', 'fa-twitter', 'fa-3x', 'twitterBtn')
    if (article.web_url) {
      twitterBtn.setAttribute('onclick', `tweetArticle('${article.web_url}')`) // NYT TWEET
    } else if (article.url) {
      twitterBtn.setAttribute('onclick', `tweetArticle('${article.url}')`) // NYT TWEET top stories
    } else {
      twitterBtn.setAttribute('onclick', `tweetArticle('${article.webUrl}')`) // GUARDIAN TWEET
    }
    twitterBtn.addEventListener('click', tweetArticle)
    // CONNECT ALL DOM NODES 
    link.appendChild(picture)
    newsItem.append(logo, headline, link, twitterBtn, dateEl)
    setTimeout(() => {
      newsContainer.appendChild(newsItem)
    }, i * 100)
  })
}

// --------------------------------------------------------------
// FUNCTION FOR TWEETING AN ARTICLE
function tweetArticle(itemUrl) {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${itemUrl}`
  window.open(twitterUrl, '_blank')
}

// --------------------------------------------------------------
// ON SITE LOAD
function newsSummary() {
  clearArticles()
  GuardianMostRead()
  NYTmostRead()
}

newsSummary()