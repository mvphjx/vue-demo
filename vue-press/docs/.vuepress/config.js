module.exports = {
    title: 'Hello VuePress',
    description: '测试一下',
    themeConfig: {
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Dev', link: '/guide/dev'},
            {text: '官方文档', link: 'https://vuepress.vuejs.org/'},
        ],
        lastUpdated: 'Last Updated',
        sidebar: ['/', '/guide/build', '/guide/dev', '/guide/searchinlist']
    }
}
