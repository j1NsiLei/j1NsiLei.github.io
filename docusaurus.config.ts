import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'jsl_blog',
  //tagline: 'Welcome come to my blog',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://j1NsiLei.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'j1NsiLei', // Usually your GitHub org/user name.
  projectName: 'j1NsiLei.github.io', // Usually your repo name.

  onBrokenMarkdownLinks: 'warn',
  onBrokenLinks: 'warn',
  deploymentBranch: 'gh-pages',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
       [
         '@easyops-cn/docusaurus-search-local',
         {
           hashed: true,               // 生成哈希提高安全性
           language: ['zh'],           // 支持中文搜索
           highlightSearchTermsOnTargetPage: true,  // 高亮搜索关键词
           docsRouteBasePath: '/docs', // 如果你的文档路径是 /docs
           blogRouteBasePath: '/blog', // 如果你的博客路径是 /blog
         },
       ],
     ],
  themeConfig: 
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  ({
    // Replace with your project's social card
    announcementBar: {
      id: 'support_us',
      content: '⭐️ 如果这个网站能帮助到你，欢迎给一个star支持作者  <a target="_blank" rel="noopener noreferrer" href="https://github.com/">GitHub</a>',
      backgroundColor: '#fafbfc',
      textColor: '#091E42',
      isCloseable: true,
    }, 
    search: {
      provider: 'local', // 关键：启用本地搜索
    },
    navbar: {
      title: '学习笔记',
      hideOnScroll: true,
      logo: {
        alt: 'My Site Logo',
        src: 'img/favicon.ico',
      },

      items: [
        {
          type: 'docSidebar',
          sidebarId: 'Penetration_Sidebar',
          position: 'left',
          label: '渗透测试',
        },
        {
          type: 'docSidebar',
          sidebarId: 'Response_Sidebar',
          position: 'left',
          label: '应急响应',
        },
        {
          type: 'docSidebar',
          sidebarId: 'Code_Sidebar',
          position: 'left',
          label: '代码审计',
        },
        {
          type: 'docSidebar',
          sidebarId: 'Assessment_Sidebar',
          position: 'left',
          label: '等保测评',
        },
        {
          type: 'docSidebar',
          sidebarId: 'System_Sidebar',
          position: 'left',
          label: '操作系统',
        },
        {
          type: 'docSidebar',
          sidebarId: 'Tools_Sidebar',
          position: 'left',
          label: '工具合集',
        },
        {
          type: 'docSidebar',
          sidebarId: 'Other_Sidebar',
          position: 'left',
          label: '其他',
        },
        {to: '/blog', label: 'Blog', position: 'right'},
        {
          type: 'localeDropdown',  // 语言切换（可选）
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
        // {
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
   
    footer: {
      style: 'dark',
      links: [
        {
          title: '社交联系',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/j1NsiLei/',
            },
            {
              label: 'QQ邮箱',
              href: 'mailto:jsl_email@foxmail.com',
            },
          ],
        },
        {
          title: '笔记',
          items: [
            {
              label: '渗透测试',
              to: '/docs/Penetration',
            }, 
            {
              label: '应急响应',
              to: '/docs/Response',
            }, 
            {
              label: '工具合集',
              to: '/docs/Tools',
            },
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            // },
            // {
            //   label: 'Discord',
            //   href: 'https://discordapp.com/invite/docusaurus',
            // },
            // {
            //   label: 'X',
            //   href: 'https://x.com/docusaurus',
            // },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'Docusaurus',
              href: 'https://docusaurus.io/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} jsl_blog | Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    blog: {
      sidebar: {
        groupByYear: true,
      },
    },
    docs: {
      versionPersistence: 'localStorage',
      sidebar: {
        autoCollapseCategories: true,
        hideable: true
      },
    },
    metadata: [
      {name: 'keywords', content: '技术博客,博客,学习笔记'},
      {property: 'og:type', content: 'website'},
    ],
  }) satisfies Preset.ThemeConfig,
  markdown: {
    mermaid: true,
  },
};

export default config;
