const favicons = require('favicons');
const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '../public/images/logo.png');
const dest = path.join(__dirname, '../public');

const configuration = {
  path: "/",
  appName: "In Quest of Knowledge",
  appShortName: "In Quest of Knowledge",
  appDescription: "A Biography of Late Dr Vibha Dineshkumar Shah - MPharm, FCCA, MBA",
  developerName: "Dineshkumar Devchand Shah",
  developerURL: "https://inquestofknowledge.com",
  dir: "auto",
  lang: "en-US",
  background: "#fff",
  theme_color: "#d4572a",
  appleStatusBarStyle: "black-translucent",
  display: "standalone",
  orientation: "any",
  scope: "/",
  start_url: "/?homescreen=1",
  version: "1.0",
  logging: false,
  pixel_art: false,
  loadManifestWithCredentials: false,
  manifestMaskable: false,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: true,
    windows: true,
    yandex: false
  }
};

console.log('Generating favicons...');

favicons(source, configuration)
  .then((response) => {
    // Write images to public directory
    response.images.forEach((image) => {
      fs.writeFileSync(path.join(dest, image.name), image.contents);
      console.log(`Generated: ${image.name}`);
    });

    // Write files (manifest, etc.) to public directory
    response.files.forEach((file) => {
      fs.writeFileSync(path.join(dest, file.name), file.contents);
      console.log(`Generated: ${file.name}`);
    });

    // Save the HTML meta tags for later use
    const htmlTags = response.html.join('\n');
    fs.writeFileSync(path.join(__dirname, 'favicon-html.txt'), htmlTags);
    console.log('HTML tags saved to scripts/favicon-html.txt');
    
    console.log('✅ Favicons generated successfully!');
    console.log('\nNext steps:');
    console.log('1. Copy the HTML tags from scripts/favicon-html.txt');
    console.log('2. Replace the favicon links in app/root.tsx');
  })
  .catch((error) => {
    console.error('Error generating favicons:', error);
  });
