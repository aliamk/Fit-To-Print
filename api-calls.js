const NYTapIKey = '&api-key=boFLX5LE0ORtGQIaE9zdumG5S4zerNcU'
const GuardianApIKey = '&api-key=d9a93d62-0b23-4c01-b135-abc46c7bf018'
const NytApiKey = '&api-key=boFLW5L70ORtGQIaE9zdumG5S4zerNcU'
const GuaranApiKey = '&api-key=d9bb93d62-0b13-4c01-b135-abc46c7bf018'
const NYTapiKey = '&api-key=boFLW5LE0ORtGQIaE9zdumG5S4zerNcU'
const GuardiaApiKey = '&api-key=d9a93d62-0b13-4c01-b145-abc46c7bf018'
const NYTApiKey = '&api-key=boFLW5LE0ORtGQIaE9zdumG5S4zerKcU'
const GuardianApiKey = '&api-key=d9a93d62-0b13-4c01-b135-abc46c7bf018'
const NYTapiKEY = '&api-key=boFLW5Lk0ORtGQIaE9zdumG5S4zerNcU'
const GuardianAPIKey = '&api-key=d9a93d82-0b13-4c01-b135-abc46c7bf018'

// Base API URLs
const GuardianUrl = 'https://content.guardianapis.com/search?'
const GuardianFields = '&show-fields=thumbnail&page-size=20'
const GuardianArchive = 'order-by=oldest&'
const NYTurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='
const NYTfields = '&limit=20&'

// SEARCH KEYWORDS API URL
const NYTapiUrl = `https://api.nytimes.com/svc/topstories/v2/politics.json?${NYTapiKey}`
const GuardianApiUrl = `https://content.guardianapis.com/search?order-by=newest&show-fields=thumbnail&page-size=20${GuardianApiKey}`

// THE DAY'S MOST READ
const GmostReadUrl = `https://content.guardianapis.com/uk?show-most-viewed=true&show-fields=thumbnail${GuardianApiKey}`
const NYTmostReadUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?${NYTapiKey}`
const NYTmostFB = `https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?${NYTapiKey}`
const NYTmostEmailed = `https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?${NYTapiKey}`

const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

// --------------------------------------------------------------
//  GLOBAL ARRAYS
let mostReadArticlesArray = []  // For the singleMostRead and all most read
let NYTarray = []               // 
let GuardianArray = []
let headlinesArray = []         // Top Stories

// --------------------------------------------------------------
//  API CALLS
// Called by newsSummary - the most read articles query
async function NYTmostRead() {
  try {
    const response = await fetch(`${NYTmostReadUrl}`)
    const data = await response.json()
    mostReadArticlesArray = data.results
    console.log('mostReadArticlesArray: ', mostReadArticlesArray)
    singleMostReadArticleDOMnodes()
    keyPersonalities()
    mostReadArticlesToday()    
  } catch (error) {
    console.log(error.message)
  }
}

// Called by newsSummary -  the most read articles query
async function GuardianMostRead() {
  try {
    const response = await fetch(`${GmostReadUrl}`)
    const data = await response.json()
    mostReadArticlesArray = data.response.mostViewed
    GuardianArray = data.response.mostViewed[0]
    localStorage.setItem('GuardianArray:', JSON.stringify(GuardianArray))
    singleMostReadArticleDOMnodes()
    mostReadArticlesToday()
  } catch (error) {
    console.log(error.message)
  }
}

// FETCH TOP HEADLINES from NYT
async function fetchNYTarticles() {
  try {
    const response = await fetch(NYTapiUrl)
    const data = await response.json()
    headlinesArray = data.results
    allNewsCreateDOMnodes(headlinesArray)
  } catch (error) {
    console.log(error.message)
  }
}

// FETCH TOP HEADLINES from Guardian
async function fetchGarticles() {
  try {
    const response = await fetch(GuardianApiUrl)
    const data = await response.json()
    headlinesArray = data.response.results 
    // GcreateDOMnodes()
    allNewsCreateDOMnodes()
  } catch (error) {
    console.log(error.message)
  }
}

// Onclick: NYT's per_facet data for personality search
async function keyNYTPersonalityFetch(searchWord) {
  clearArticles()
  try { 
    const NYsearchValue = `${searchWord}`
    console.log('NYsearchValue: ', NYsearchValue)
    const response = await fetch(`${NYTurl}${NYsearchValue}${NYTfields}${NYTapiKey}`)
    const data = await response.json()
    headlinesArray = data.response.docs
    console.log('NYT_perFacet: ', headlinesArray)
    allNewsCreateDOMnodes()
  } catch (error) {
    console.log(error.message)
  }
}

// Onclick: Guardian's per_facet data for personality search
async function keyGuardianPersonalityFetch(searchWord) {
  try {
    let searchValue = 'q=' + `${searchWord}`
    const response = await fetch(`${GuardianUrl}${searchValue}${GuardianFields}${GuardianApiKey}`)
    const data = await response.json()
    headlinesArray = data.response.results
    console.log('Guardian_perFacet: ', headlinesArray)
    allNewsCreateDOMnodes()
  } catch (error) {
    console.log(error.message) 
  }
}

// Word search in Search input field - NYT
async function NYTsearchWords() {
  try {    
    const NYsearchValue = `${searchWord.value}`
    const response = await fetch(`${NYTurl}${NYsearchValue}${NYTfields}${NYTapiKey}`)
    const data = await response.json()
    headlinesArray = data.response.docs
    allNewsCreateDOMnodes()
  } catch (error) {
    console.log(error.message)
  }
}

// Word search in Search input field - Guardian
async function GsearchWords() {
  try {
    let searchValue = 'q=' + `${searchWord.value}`
    const response = await fetch(`${GuardianUrl}${searchValue}${GuardianFields}${GuardianApiKey}`)
    const data = await response.json()
    headlinesArray = data.response.results
    console.log(headlinesArray)
    allNewsCreateDOMnodes()
  } catch (error) {
    console.log(error.message) 
  }
}











// APIKEY KEYS 
// const NYTapiKey = NYT_API_KEY
// const GuardianApiKey = GUARDIAN_API_KEY