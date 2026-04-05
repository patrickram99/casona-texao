'use strict';

const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');

const BLOG_OUTPUT_DIR = path.join(__dirname, '..', 'blog_output');
const ARTICLES_DIR = path.join(BLOG_OUTPUT_DIR, 'articles');
const COVER_IMAGES_DIR = path.join(BLOG_OUTPUT_DIR, 'cover_images');

async function seedCasonaTexao() {
  const shouldImportSeedData = await isFirstRun();

  if (!shouldImportSeedData) {
    console.log('Seed data has already been imported. Clear your database to reimport.');
    return;
  }

  try {
    console.log('Setting up Casona Texao...');
    await importSeedData();
    console.log('Seed complete!');
  } catch (error) {
    console.log('Could not import seed data');
    console.error(error);
  }
}

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'initHasRun' });
  await pluginStore.set({ key: 'initHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::${controller}.${controller}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });
  await Promise.all(allPermissionsToCreate);
}

async function uploadFile(filePath, name) {
  const stats = fs.statSync(filePath);
  const ext = path.extname(filePath).slice(1);
  const mimeType = mime.lookup(ext) || 'application/octet-stream';

  const fileData = {
    filepath: filePath,
    originalFileName: path.basename(filePath),
    size: stats.size,
    mimetype: mimeType,
  };

  const [uploaded] = await strapi.plugin('upload').service('upload').upload({
    files: fileData,
    data: {
      fileInfo: {
        alternativeText: name,
        caption: name,
        name,
      },
    },
  });

  return uploaded;
}

function parseMarkdownArticle(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) return null;

  const frontmatter = frontmatterMatch[1];
  const body = frontmatterMatch[2].trim();

  const meta = {};
  for (const line of frontmatter.split('\n')) {
    const match = line.match(/^(\w[\w_]*)\s*:\s*(.*)$/);
    if (match) {
      let value = match[2].trim();
      // Remove surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).join(', ');
      }
      meta[match[1]] = value;
    }
  }

  return { ...meta, body };
}

function markdownToHtml(md) {
  // Basic markdown to HTML conversion
  let html = md;

  // Headers
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Lists
  html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  // Paragraphs - wrap non-tagged lines
  const lines = html.split('\n\n');
  html = lines.map(line => {
    line = line.trim();
    if (!line) return '';
    if (line.startsWith('<h') || line.startsWith('<ul') || line.startsWith('<ol') || line.startsWith('<blockquote')) {
      return line;
    }
    return `<p>${line}</p>`;
  }).join('\n\n');

  return html;
}

async function importCategories() {
  // Collect unique categories from markdown articles
  const categorySet = new Set();
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const article = parseMarkdownArticle(path.join(ARTICLES_DIR, file));
    if (article && article.category) {
      categorySet.add(article.category);
    }
  }

  // Also add the three main categories from the plan
  categorySet.add('Charlas');
  categorySet.add('Teatro');
  categorySet.add('Eventos Culturales');

  const categoryMap = {};
  for (const name of categorySet) {
    const slug = name.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const entry = await strapi.documents('api::category.category').create({
      data: {
        name,
        slug,
        description: `Artículos sobre ${name}`,
      },
    });
    categoryMap[name] = entry;
    console.log(`  Category: ${name}`);
  }

  return categoryMap;
}

async function importArticles(categoryMap) {
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md')).sort();
  let imported = 0;

  for (const file of files) {
    const filePath = path.join(ARTICLES_DIR, file);
    const article = parseMarkdownArticle(filePath);
    if (!article) {
      console.log(`  Skipping ${file}: could not parse`);
      continue;
    }

    const htmlContent = markdownToHtml(article.body);

    // Find matching cover image
    const filePrefix = file.replace('.md', '');
    const coverImagePath = path.join(COVER_IMAGES_DIR, `${filePrefix}.png`);

    let cover = null;
    if (fs.existsSync(coverImagePath)) {
      try {
        cover = await uploadFile(coverImagePath, article.title || filePrefix);
      } catch (err) {
        console.log(`  Warning: Could not upload cover for ${file}: ${err.message}`);
      }
    }

    // Find category
    const category = article.category && categoryMap[article.category]
      ? categoryMap[article.category]
      : null;

    const entryData = {
      title: article.title || filePrefix,
      slug: article.slug || filePrefix,
      content: htmlContent,
      excerpt: article.excerpt || '',
      metaDescription: article.meta_description || '',
      tags: article.tags || '',
      publishedAt: article.date ? new Date(article.date).toISOString() : new Date().toISOString(),
    };

    if (cover) {
      entryData.cover = cover.id;
    }
    if (category) {
      entryData.category = category.id;
    }

    try {
      await strapi.documents('api::article.article').create({
        data: entryData,
        status: 'published',
      });
      imported++;
      console.log(`  Article ${imported}: ${entryData.title.substring(0, 60)}...`);
    } catch (error) {
      console.error(`  Error importing ${file}:`, error.message);
    }
  }

  console.log(`Imported ${imported} articles.`);
}

async function importSiteConfig() {
  await strapi.documents('api::site-config.site-config').create({
    data: {
      whatsappNumber: '51999999999',
      whatsappMessage: 'Hola, me gustaría obtener información sobre los eventos de Casona Texao.',
      address: 'Calle Puente Grau 108, Cercado, Arequipa, Perú',
      googleMapsPlaceId: 'ChIJZXT4EQBLQpERst-1U1zGOr4',
      tagline: 'Donde convergen el arte, la cultura y la música',
      socialFacebook: 'https://www.facebook.com/casonatexao',
      socialInstagram: 'https://www.instagram.com/casonatexao',
    },
  });
  console.log('  Site config created');
}

async function importGlobal() {
  const faviconPath = path.join(__dirname, '..', 'favicon.png');
  let favicon = null;
  if (fs.existsSync(faviconPath)) {
    favicon = await uploadFile(faviconPath, 'favicon');
  }

  const entryData = {
    siteName: 'Casona Texao',
    siteDescription: 'Centro Cultural Casona Texao - Donde convergen el arte, la cultura y la música en Arequipa, Perú.',
    publishedAt: new Date().toISOString(),
  };
  if (favicon) {
    entryData.favicon = favicon.id;
  }

  await strapi.documents('api::global.global').create({
    data: entryData,
  });
  console.log('  Global settings created');
}

async function importAbout() {
  await strapi.documents('api::about.about').create({
    data: {
      title: 'Sobre Casona Texao',
      blocks: [
        {
          __component: 'shared.rich-text',
          body: `<h2>Nuestra Historia</h2>
<p>La Casona Texao es un espacio cultural ubicado en el corazón del Centro Histórico de Arequipa, en la emblemática Calle Puente Grau 108. Reconocida como Punto de Cultura por el Ministerio de Cultura del Perú, nuestra misión es democratizar el acceso al arte y la cultura.</p>

<h2>Nuestra Misión</h2>
<p>Promover el desarrollo cultural y artístico de Arequipa a través de charlas, teatro, música, festivales y eventos que celebren nuestra identidad y patrimonio.</p>

<h2>Nuestra Visión</h2>
<p>Ser el centro cultural de referencia en el sur del Perú, donde artistas, gestores culturales y la comunidad converjan para crear, aprender y transformar.</p>

<h2>Nuestros Valores</h2>
<p>Inclusión, creatividad, compromiso comunitario, respeto por el patrimonio y pasión por las artes.</p>`,
        },
      ],
      publishedAt: new Date().toISOString(),
    },
  });
  console.log('  About page created');
}

async function importSeedData() {
  // Set public read permissions
  await setPublicPermissions({
    article: ['find', 'findOne'],
    category: ['find', 'findOne'],
    'about': ['find', 'findOne'],
    'global': ['find', 'findOne'],
    'page': ['find', 'findOne'],
    'site-config': ['find', 'findOne'],
  });
  console.log('Public permissions set.');

  // Import categories
  console.log('Importing categories...');
  const categoryMap = await importCategories();

  // Import articles from markdown files
  console.log('Importing articles...');
  await importArticles(categoryMap);

  // Import site config
  console.log('Importing site config...');
  await importSiteConfig();

  // Import global settings
  console.log('Importing global settings...');
  await importGlobal();

  // Import about page
  console.log('Importing about page...');
  await importAbout();
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedCasonaTexao();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
