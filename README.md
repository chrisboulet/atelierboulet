# Project: Culinary Website

This project is a culinary website built using Hugo, enhanced with several features and integrations. It's designed to be a resource for recipes, cooking tips, and related culinary information.

## Structure

The project is organized into several key directories, each serving a distinct purpose:

-   **root:** Contains core project configurations and files.
-   **auth0-actions:** Contains JavaScript actions for Auth0.
-   **site:** The main directory for the Hugo website.

### Root Directory Files

-   **CNAME:** Specifies a custom domain name for the website.
-   **Dockerfile:** Defines the Docker image for the project.
-   **docker-compose.yml:** Orchestrates the Docker containers.
-   **netlify.toml:** Configuration file for Netlify deployment.
-   **papermod-head-changes.patch:** Patch file for customizing the Papermod theme's head section.
-   **.idx/dev.nix:** Nix environment configuration for development.

### auth0-actions

-   **INSTALLATION.md:** Documentation for setting up the Auth0 actions.
-   **README.md:** Overview of the Auth0 actions.
-   **github-token-action.js:** JavaScript file for a GitHub token action.

### site

The core of the website.

#### Configuration

-   **config.toml:** Main configuration file for the Hugo website.
-   **package.json:** Manages dependencies and scripts for the site.
-   **new-recette.ps1:** Powershell script to create new recipe.

#### Content

-   **content/:** Contains all the markdown content for the website.
    -   **search.md:** Search page configuration.
    -   **astuces/:** Cooking tips and tricks.
        -   **_index.md:** Astuces section landing page.
        -   **cuisson-parfaite-viande.md:** Example of a cooking tip article.
    -   **collections/:** Group of recipes.
        -   **_index.md:** Collections section landing page.
        -   **repas-rapides.md:** Example of a collection article.
    -   **posts/:** Individual recipe pages.
        -   **recetteTest.md:** Example of a recipe article.
        -   **veau-a-la-creme.md:** Another example of a recipe.
        -   **veau-au-cari-doux-v2.md:** Another example of a recipe.
        -   **veau.md:** Another example of a recipe.

#### Layouts

-   **layouts/:** Contains the HTML templates.
    -   **_default/:** Default templates for various content types.
        -   **baseof.html:** Base template for all pages.
        -   **index.json:** Json for index.
        -   **list.html:** Template for listing pages (categories, tags, etc.).
        -   **search.html:** Template for the search page.
        -   **single-collection.html:** Template for collection pages.
        -   **single.html:** Template for individual recipe pages.
    -   **partials/:** Reusable HTML snippets.
        -   **cover.html:** Cover template.
        -   **extend-head.html:** Head customization template.
        -   **pagination.html:** Pagination template.
        -   **post-meta-info.html:** Post metadata template.
        -   **post-meta.html:** Post metadata template.
        -   **post-share.html:** Post share template.
        -   **share-buttons.html:** Template for share buttons.
        -   **svg.html:** Template for including SVG images.

#### Public

-   **public/:** Contains the generated static files after running `hugo`.
    -   **404.html:** Custom 404 error page.
    -   **favicon-64x64.png:** Website favicon.
    -   **index.html:** Main index page.
    -   **index.json:** Json for index.
    -   **index.xml:** Main index sitemap.
    -   **logo-atelierboulet.png:** Website logo.
    -   **logo-transparent.png:** Website logo with transparency.
    -   **manifest.json:** Web app manifest file.
    -   **offline.html:** Offline page.
    -   **sitemap.xml:** Website sitemap.
    -   **sw.js:** Service worker for PWA.
    -   **test-image.html:** Image test page.
    -   **css/:** Stylesheets.
        -   **print.css:** Print specific stylesheet.
        -   **style.min.css:** Minified site stylesheet.
    -   **js/:** JavaScript files.
        -   **portion-calculator.js:** JS file to manage portion calculator.
        -   **pwa-init.js:** JS file to initiate the PWA.
    -   **astuces/:** Index for cooking tips.
    -   **categories/:** Index for categories.
    -   **collections/:** Index for collections.
    -   **diets/:** Index for diets.
    -   **difficulties/:** Index for difficulties.
    -   **durations/:** Index for durations.
    -   **posts/:** Index for individual recipes.
    -   **search/:** Search section index.
    -   **seasons/:** Index for seasons.
    -   **tags/:** Index for tags.
    -   **types/:** Index for types.
    -   **assets/css/stylesheet.6da9a63d25a9608bca2f7f907a030e887a7dd3c3f3918e4cc113129361414bda.css:** CSS generated file.
    - ... more index file for different category

#### Scripts

-   **scripts/:** Contains additional scripts.
    -   **validate.js:** JavaScript file for content validation.

#### Static

-   **static/:** Contains static assets.
    -   **favicon-64x64.png:** Website favicon.
    -   **logo-atelierboulet.png:** Website logo.
    -   **logo-transparent.png:** Website logo with transparency.
    -   **manifest.json:** Web app manifest file.
    -   **offline.html:** Offline page.
    -   **sw.js:** Service worker for PWA.
    -   **test-image.html:** Image test page.
    -   **css/:** Stylesheets.
        -   **print.css:** Print specific stylesheet.
    -   **js/:** JavaScript files.
        -   **portion-calculator.js:** JS file to manage portion calculator.
        -   **pwa-init.js:** JS file to initiate the PWA.
    -   **admin/:** Netlify CMS configuration.
        -   **config.yml:** Netlify CMS config file.
        -   **flutter_config.json:** Netlify CMS config file.
        -   **index.html:** Netlify CMS index.

## Features

-   **Hugo Static Site:** Fast, SEO-friendly website.
-   **Dockerized:** Easy development and deployment using Docker.
-   **Netlify Deployment:** Configuration for seamless deployment to Netlify.
-   **Auth0 Actions:** Integration with Auth0 for authentication-related actions.
-   **Progressive Web App (PWA):** Offline support and enhanced user experience.
-   **Responsive Design:** Adapts to different screen sizes.
-   **Customizable:** Extendible through Hugo's theming and templating system.
-   **Search:** Search functionnality.
-   **Portion Calculator:** Calculator to adapt the recipes.

## Getting Started

1.  Clone the repository.
2.  Set up the development environment using the provided Docker configuration or Nix environment.
3.  Run `hugo server` in the `site/` directory to start the development server.
4.  Navigate to `http://localhost:1313` in your browser.

## Contributing

Contributions are welcome! Please read the contribution guidelines before submitting a pull request.

## License

This project is licensed under the [License Name] - see the `LICENSE.md` file for details.