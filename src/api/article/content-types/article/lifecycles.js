'use strict';

const MAX_FEATURED = 5;

module.exports = {
  async afterCreate(event) {
    await enforceFeaturedCap(event);
  },
  async afterUpdate(event) {
    await enforceFeaturedCap(event);
  },
};

async function enforceFeaturedCap(event) {
  const { result } = event;

  // Only act when the saved article is featured
  if (!result || !result.featured) return;

  // Find all featured articles, oldest first
  const featured = await strapi.documents('api::article.article').findMany({
    filters: { featured: true },
    sort: 'publishedAt:desc',
    status: 'published',
    limit: 100,
  });

  if (featured.length <= MAX_FEATURED) return;

  // Un-feature everything beyond the cap
  const toUnfeature = featured.slice(MAX_FEATURED);
  for (const article of toUnfeature) {
    await strapi.documents('api::article.article').update({
      documentId: article.documentId,
      data: { featured: false },
    });
  }
}
