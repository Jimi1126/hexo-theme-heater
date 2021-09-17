import $ from 'jquery'
import TypeIt from 'typeit'
import Elevator from './lib/elevator'
import * as Utils from './lib/util'

const state = Object.freeze({
  elevator: new Elevator({
    container: document.querySelector('#container'),
    duration: 500,
  }),
})

const methods = Object.freeze({
  back() {
    console.log('back')
  },
  search() {
    console.log('search')
  },
  theme(e) {
    // 点击事件
    if (e) {
      if ($('html').hasClass('dark')) {
        localStorage.theme = 'light'
        $('html').addClass('light')
        $('html').removeClass('dark')
      } else {
        localStorage.theme = 'dark'
        $('html').addClass('dark')
        $('html').removeClass('light')
      }
    } else {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        localStorage.theme = 'dark'
        $('html').addClass('dark')
      } else {
        localStorage.theme = 'light'
        $('html').addClass('light')
      }
    }
  },
  toggleMenu(e) {
    if (!e.currentTarget) return
    const $menu = $(e.currentTarget)
    const $drop = $(`#${$menu.attr('menu')}Menu`)
    const $icon = $menu.find('i:last')
    if ($drop.hasClass('hidden')) {
      $drop.removeClass('hidden')
      $icon.removeClass('fa-angle-down').addClass('fa-angle-up')
    } else {
      $drop.addClass('hidden')
      $icon.removeClass('fa-angle-up').addClass('fa-angle-down')
    }
  },
  menuEvent(e) {
    console.log('menuEvent')
  },

  /**
   * 文章导航
   * @param {*} id
   */
  postNav(e, id) {
    // const $el = $(e.currentTarget);
    // $el.parent().children().removeClass('bg-gray-800')
    // $el.addClass("bg-gray-800")
    state.elevator.elevate(document.querySelector('#' + id))
  },
})

const onMounted = () => {
  /* 事件绑定 */
  $('#myUsage').length && new TypeIt('#myUsage').go()
  $('#back2top').on('click', state.elevator.elevate)
  $('#container').on(
    'scroll',
    Utils.debounce((e) => {
      if (e.currentTarget.scrollTop) {
        $('#head').addClass('shadow-lg')
        $('#back2top').removeClass('invisible').addClass('visible')
      } else {
        $('#head').removeClass('shadow-lg')
        $('#back2top').removeClass('visible').addClass('invisible')
      }
    }, 100)
  )
  // bar
  ;['back', 'theme', 'search'].forEach((id) =>
    $('#' + id).on('click', methods[id])
  )
  methods.theme()
}
$(document).ready(onMounted)
