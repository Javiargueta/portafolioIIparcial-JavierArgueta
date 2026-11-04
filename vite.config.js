import { defineConfig } from 'vite';
import purgecss from '@fullhuman/postcss-purgecss';
import { minify } from 'html-minifier-terser';

const htmlMinify = () => ({
  name: 'html-minify',
  apply: 'build',
  enforce: 'post',
  transformIndexHtml: (html) =>
    minify(html, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true,
    }),
});

export default defineConfig(({ command }) => ({
  base: './',
  plugins: [htmlMinify()],
  css: {
    postcss: {
      plugins:
        command === 'build'
          ? [
              (purgecss.purgeCSSPlugin || purgecss.default || purgecss)({
                content: ['./index.html', './src/**/*.js'],
                defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
              }),
            ]
          : [],
    },
  },
  build: {
    outDir: 'docs',
    minify: true,
    cssMinify: true,
    assetsInlineLimit: 0,
  },
}));
