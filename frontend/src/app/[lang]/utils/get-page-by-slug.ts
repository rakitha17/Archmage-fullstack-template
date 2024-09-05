import { fetchAPI } from "@/app/[lang]/utils/fetch-api"

export async function getPageBySlug(slug: string, lang: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

  const path = `/pages`
  const urlParamsObject = {
    filters: { slug },
    populate: [
      "contentSections",
      "contentSections.link",
      "contentSections.picture",
      "contentSections.features.url",
      "contentSections.features.media",
      "contentSections.images",
      "contentSections.image",
      "contentSections.cards",
      "contentSections.cards.image",
      "contentSections.items.image",
    ],
    locale: lang,
  }
  const options = { headers: { Authorization: `Bearer ${token}` } }
  return await fetchAPI(path, urlParamsObject, options)
}
