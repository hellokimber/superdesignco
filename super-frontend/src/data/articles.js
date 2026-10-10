export const ARTICLES = [
  {
    slug: 'art-direction-before-image-generation',
    path: '/blog/art-direction-before-image-generation/',
    title: 'Art direction before image generation',
    category: 'AI art direction',
    shareImage: {
      path: '/blog/art-direction-editorial.webp',
      width: 2752,
      height: 1536,
      mimeType: 'image/webp',
      alt: 'AI fashion editorial with a model in cobalt blue knit beside rocks in an open landscape',
    },
    description: 'How we plan AI imagery around your brand: define the brief, choose a visual style, write prompts, and check images before use.',
    excerpt: 'How we plan AI imagery around a brand’s message, choose a visual style, and keep images consistent.',
    author: 'Kim vanderHelm',
    authorRole: 'Creative director and brand engineer',
    datePublished: '2026-10-09',
    dateModified: '2026-10-09',
    introduction: 'Our AI art direction starts with your brand’s message and audience. We choose the subject, setting, and visual style to support that message. We use this approach for editorial and fashion imagery, product photography, portraits, and characters.',
    principle: 'Keep the visual style consistent across images, even when the subject changes.',
    sections: [
      {
        id: 'start-with-the-brand',
        title: 'Start with the brand',
        paragraphs: [
          'Before writing a prompt, decide what the image needs to communicate. Identify the audience and where you will use it. Decide what you want people to feel or understand.',
          'Write a brief that connects these decisions to your brand’s message and personality. A launch campaign, a product page, and an editorial story each need a different image. Use the brief to judge how well each image serves its purpose.',
        ],
        reference: {
          before: 'The ',
          label: 'Design Council’s Double Diamond',
          href: 'https://www.designcouncil.org.uk/resources/the-double-diamond/',
          after: ' separates understanding the problem from developing solutions. This helps you define the brief before choosing an image.',
        },
      },
      {
        id: 'define-the-visual-world',
        title: 'Choose the visual style',
        paragraphs: [
          'Choose the light, colors, framing, materials, people, and setting to match the brief. Natural light and fine detail can make a scene feel familiar. Surreal settings, patterned surroundings, and stylized characters can make it more expressive.',
          'Choose a few visual details that express the idea. Repeat them across the image set. A limited color palette, consistent lighting, or repeated camera angles can connect images with different subjects.',
        ],
      },
      {
        id: 'generate-with-intention',
        title: 'Write prompts that guide the image',
        paragraphs: [
          'Use the prompt to describe the subject, setting, lighting, and how the image is framed. Change one detail at a time as you test variations. This helps you see which change improves the image.',
          'Compare each result with the brief. Ask whether it communicates the right message, matches the other images, and works where you need it. Choose images that meet those needs and look right when you examine the details.',
        ],
        reference: {
          before: 'For practical examples, see ',
          label: 'Adobe’s guide to image prompts',
          href: 'https://helpx.adobe.com/firefly/web/work-with-images/generate-images/writing-effective-text-prompts.html',
          after: '. It explains how descriptions of the subject, style, and lighting guide the result.',
        },
      },
      {
        id: 'edit-for-the-real-world',
        title: 'Check details and test each use',
        paragraphs: [
          'Check anatomy, materials, edges, lettering, and product details. Compare product images with accurate reference photos. The result needs to show the product faithfully as well as look appealing.',
          'Test each image where you plan to use it. Check the crop on a phone and leave space for any headline. Compare it with your logo, typography, and other images.',
          'Keep that visual style consistent across your website, product pages, social media, and campaigns.',
        ],
      },
    ],
  },
]

export function articleForSlug(slug) {
  return ARTICLES.find((article) => article.slug === slug)
}

const articleDateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
})

export function formatArticleDate(date) {
  return articleDateFormat.format(new Date(`${date}T00:00:00Z`))
}
