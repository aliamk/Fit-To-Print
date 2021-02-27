# Fit To Print

## A news app built without any libraries or frameworks to see how much functionality can be built in vanilla Javascript
## Using APIs from The Guardian and the New York Times newspapers
*Javascript - DOM Manipulation - Fetch - Async/Await - CSS*

### An overview of the homepage and the top stories page: the homepage features both newspapers' most read articles of the moment
![App Overview](https://github.com/aliamk/fit_to_print/blob/master/images/loader_top-stories.gif)

### Can tweet any of the articles from your personal Twitter account
![Tweet Articles](https://github.com/aliamk/fit_to_print/blob/master/images/loader_tweet.gif)

### The NYT API has a 'per-facet' property which lists names of people mentioned in its articles - clicking on them searches both the NYT and the Guardian for that name
![App PerFacet Search](https://github.com/aliamk/fit_to_print/blob/master/images/loader_per_facet_dearch.gif)

### Users can search both APIs with the same keyword or name at the same time
![App Search](https://github.com/aliamk/fit_to_print/blob/master/images/loader_search.gif)

### The gallery shows the newspapers' 20 most popular articles - clicking on one will open the article in a new tab
![Most popular stories](https://github.com/aliamk/fit_to_print/blob/master/images/loader_most-popular.gif)

#### **Biggest obstacle:** the NYT API is regularly being modified... almost weekly.  This means that property names are changed and articles generate with broken links or missing images etc.  For example, they keep changing the property for accessing their article images: meta-data.image to metadata.thumbnail to metadata.image.

Post-MVP plans:
1. Responsive design - want to make the layout work well on all screen sizes and browsers - currently it looks best in Chrome and sizes +900px
1. Modular Programming - look at ways to refactor the code to make it more readable, shorter and reusable
