export const isEmpty = (value: any) => {
    let isEmptyObject = function(a) {
      if (typeof a.length === 'undefined') {
        // it's an Object, not an Array
        let hasNonempty = Object.keys(a).some(function nonEmpty(element) {
          return !isEmpty(a[element])
        })
        return hasNonempty ? false : isEmptyObject(Object.keys(a))
      }
  
      return !a.some(function nonEmpty(element) {
        // check if array is really not empty as JS thinks
        return !isEmpty(element) // at least one element should be non-empty
      })
    }
    return (
      value == false ||
      typeof value === 'undefined' ||
      value == null ||
      (typeof value === 'object' && isEmptyObject(value))
    )
}

export const getAttrOfDocElement = (htmlDoc: any, query: string, attr: string) => {
const el = htmlDoc.querySelector(query)
if (!el) {
    return null
}
return el.getAttribute(attr)
}


export const fixRelativeUrls = (baseUrl: string, itemUrl: string) => {
  const normalizedUrl = itemUrl.toLocaleLowerCase()
  if (normalizedUrl.startsWith('http://') || normalizedUrl.startsWith('https://')) {
    return itemUrl
  }
  return new URL(itemUrl, baseUrl).href
}

export const getBaseUrl = (htmlDoc: any, url: string) => getAttrOfDocElement(htmlDoc, 'base', 'href') || new URL(url).origin
