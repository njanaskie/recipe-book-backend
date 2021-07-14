// const axios = require("axios")
// const cheerio = require("cheerio")
// // import { isEmpty, getTitleOfDoc, getAttrOfDocElement, fixRelativeUrls, getBaseUrl } from '../utils'

// // const url = 'https://stackoverflow.com/questions/38884522/why-is-my-asynchronous-function-returning-promise-pending-instead-of-a-val'

// let getData = (html, url) => {
//     // let baseUrl = getBaseUrl(html, url)
//     const $ = cheerio.load(html);
//     // const title = /[^-]*/.exec($('title').first().text())[0]
//     const title = $('title').first().text().trim()
//     const site = /[^-]*$/.exec(title)[0].trim()
//     const img = $('img').attr('src')
//     // const img = $('img').map(function() {
//     //   $(this).attr('src')
//     // })
//     // const img = [
//     //   getAttrOfDocElement(html, 'meta[property="og:logo"]', 'content'),
//     //   getAttrOfDocElement(html, 'meta[itemprop="logo"]', 'content'),
//     //   getAttrOfDocElement(html, 'img[itemprop="logo"]', 'src'),
//     //   getAttrOfDocElement(html, "meta[property='og:image']", 'content'),
//     //   getAttrOfDocElement(html, 'img[class*="logo" i]', 'src'),
//     //   getAttrOfDocElement(html, 'img[src*="logo" i]', 'src'),
//     //   getAttrOfDocElement(html, 'meta[property="og:image:secure_url"]', 'content'),
//     //   getAttrOfDocElement(html, 'meta[property="og:image:url"]', 'content'),
//     //   getAttrOfDocElement(html, 'meta[property="og:image"]', 'content'),
//     //   getAttrOfDocElement(html, 'meta[name="twitter:image:src"]', 'content'),
//     //   getAttrOfDocElement(html, 'meta[name="twitter:image"]', 'content'),
//     //   getAttrOfDocElement(html, 'meta[itemprop="image"]', 'content'),
//     // ]
//     //   .filter(i => !isEmpty(i))
//     //   .map(i => fixRelativeUrls(baseUrl, i))

//     return { 
//       urlSite: site,
//       urlTitle: title,
//       urlImage: img 
//     }
// }

// module.exports = async (url) => {
//     let returnObject = {}
//     await axios.get(url)
//       .then(response => {
//         const fetchedData = getData(response.data, url)
//         returnObject = fetchedData
//       })
//       .catch(error => {
//         console.log('scraper.js error', error)
//       })
    
//     console.log(returnObject)
//     return returnObject
//   }

// // const $ = fetchURL(url)

// // {fetchURL: fetchURL};