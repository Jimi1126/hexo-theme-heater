const cio = require('cheerio')

function buildTitleAndNav($) {
  /* 标题与文章导航 */
  const nav = []
  $('body')
    .children()
    .each((i, node) => {
      const $node = $(node)
      let level1, level2, level3, level4
      switch (node.name) {
        case 'h1':
          $node
            .attr('id', 'anchor' + i)
            .addClass(
              'font-bold text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl p-2 sm:p-3 md:p-4 xl:p-5'
            )
            .html(`${nav.length + 1} ${$node.text()}`)
          nav.push({
            id: 'anchor' + i,
            text: $node.text(),
            children: [],
          })
          break
        case 'h2':
          level1 = nav.slice(-1)[0]
          $node
            .attr('id', 'anchor' + i)
            .addClass(
              'font-bold text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl p-2 sm:p-3 md:p-4 xl:p-5'
            )
            .html(`${nav.length}.${level1.children.length + 1} ${$node.text()}`)
          level1.children.push({
            id: 'anchor' + i,
            text: $node.text(),
            children: [],
          })
          break
        case 'h3':
          level1 = nav.slice(-1)[0]
          level2 = level1.children.slice(-1)[0]
          $node
            .attr('id', 'anchor' + i)
            .addClass(
              'font-bold text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl p-2 sm:p-3 md:p-4 xl:p-5'
            )
            .html(
              `${nav.length}.${level1.children.length}.${
                level2.children.length + 1
              } ${$node.text()}`
            )
          level2.children.push({
            id: 'anchor' + i,
            text: $node.text(),
            children: [],
          })
          break
        case 'h4':
          level1 = nav.slice(-1)[0]
          level2 = level1.children.slice(-1)[0]
          level3 = level2.children.slice(-1)[0]
          $node
            .attr('id', 'anchor' + i)
            .addClass(
              'font-bold text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl p-2 sm:p-3 md:p-4 xl:p-5'
            )
            .html(
              `${nav.length}.${level1.children.length}.${
                level2.children.length
              }.${level3.children.length + 1} ${$node.text()}`
            )
          level3.children.push({
            id: 'anchor' + i,
            text: $node.text(),
            children: [],
          })
          break
        case 'h5':
          level1 = nav.slice(-1)[0]
          level2 = level1.children.slice(-1)[0]
          level3 = level2.children.slice(-1)[0]
          level4 = level3.children.slice(-1)[0]
          $node
            .attr('id', 'anchor' + i)
            .addClass(
              'font-bold text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl p-2 sm:p-3 md:p-4 xl:p-5'
            )
            .html(
              `${nav.length}.${level1.children.length}.${
                level2.children.length
              }.${level3.children.length}.${
                level4.children.length + 1
              } ${$node.text()}`
            )
          level4.children.push({
            id: 'anchor' + i,
            text: $node.text(),
            children: [],
          })
          break
      }
    })
  // 添加导航
  let navHTML =
    '<div class="fixed flex flex-col w-1/6 top-1/3 right-8 rounded-lg text-white bg-indigo-900 overflow-x-auto" style="max-height: 33.3333333%">'
  // 深度优先
  function buildNav(arr, hie = 1) {
    const level = arr.shift()
    navHTML += `
    <a class="w-full py-3 pr-3 pl-${
      hie * 3
    } cursor-pointer hover:bg-gray-800 transition duration-500" onclick="methods.postNav(event, '${
      level.id
    }')">${level.text}</a>`
    if (level.children.length) {
      // navHTML += '<div class="w-full">';
      buildNav(level.children, hie + 1)
      // navHTML += '</div>';
    }
    while (arr.length) buildNav(arr, hie)
  }
  buildNav([...nav])
  navHTML += '</div>'
  $('body').append(navHTML)
}

hexo.extend.helper.register('reAssemblePost', (post) => {
  // const $ = cio.load(post.content)
  // /* 是否已处理标记 */
  // if ($('[reAssemblePost]').length) return
  // $('body').children().first().attr('reAssemblePost', true)
  // // buildTitleAndNav($)
  // /* 代码块 */
  // $('figure').each((i, node) => {
  //   const $node = $(node)
  //   $node.html(
  //     '<div class="border border-solid overflow-x-auto hover:bg-gray-100">' +
  //       $node.html() +
  //       '</div>'
  //   )
  //   $node.find('.gutter').addClass('border-r border-solid text-right p-3')
  //   $node.find('.code').addClass('p-3')
  // })
  // post.content = $.html()
})
