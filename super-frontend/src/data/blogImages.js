import { ARTICLES } from './articles.js'
import product from '../assets/imgs/SuperDesign_product_helmet.webp'
import portrait from '../assets/imgs/SuperDesign_DelftEditorial1.jpg'

export const BLOG_IMAGES = {
  editorial: {
    src: ARTICLES[0].shareImage.path,
    width: 2752,
    height: 1536,
    alt: 'AI fashion editorial with a model in a cobalt blue knit beside rocks in an open landscape',
    caption: 'AI editorial imagery from our gallery, with natural light, textured clothing, and a cobalt blue color palette.',
  },
  product: {
    src: product,
    width: 1600,
    height: 893,
    alt: 'AI product image of a yellow motorcycle helmet on sand with refracted light',
    caption: 'AI product imagery showing a yellow helmet on sand, with light passing through a rippled surface.',
  },
  portrait: {
    src: portrait,
    width: 1024,
    height: 824,
    alt: 'AI fashion portrait in a blue-and-white patterned environment with a matching headscarf',
    caption: 'AI editorial portrait with matching blue-and-white patterns in the clothing and setting.',
  },
}
