import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { NavLink } from 'react-bootstrap'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Parallax } from 'react-parallax'

// import Header from '../components/Header'
// import Footer from '../components/Footer'

import '../css/home.scss'

// const styles = {
//   fontFamily: 'sans-serif',
//   textAlign: 'center',
// }
// const insideStyles = {
//   // background: 'white',
//   padding: 20,
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%,-50%)',
// }
const imageh1 = 'images/home-caro1.jpg'
const imageh2 = 'images/home-caro2.jpg'
const imageh3 = 'images/home-caro3.jpg'
const imageh4 = 'images/home-caro4.jpg'
const image1 = 'images/home1.jpg'
const image2 = 'images/home2.jpg'
const image3 = 'images/home3.jpg'
const image4 = 'images/home4.jpg'

function Home() {
  useEffect(() => {
    var body = document.querySelector('.parallax'),
      scrollTop = 0,
      prevThreshold = 0
    var lv0 = body.querySelector('.parallax__layer--deep'),
      lv1 = body.querySelector('.parallax__layer--back'),
      lv2 = body.querySelector('.parallax__layer--base'),
      lv3 = body.querySelector('.parallax__layer--fore'),
      doScroll = function(newScrollTop) {
        lv1.style.top = parseInt(newScrollTop * -0.5) + 'px'
        // lv1.style.top = newScrollTop + 'px'
        lv2.style.top = newScrollTop * -2 + 'px'
        lv3.style.top = newScrollTop * -3.5 + 'px'
      },
      getProgress = function() {
        return parseInt((body.scrollTop * 100) / document.body.clientHeight)
      },
      fadeInOutHandler = function(progress) {
        opacityImage(progress, 20, 44, '.fade1')
        opacityImage(progress, 83, 117, '.fade2')
        opacityImage(progress, 200, 300, '.fade3', fadeOutEffect)
        opacityImage(progress, 130, 170, '.cycle1', memoryEffect)
        opacityImage(progress, 150, 200, '.cycle2', memoryEffect)
        // opacityImage(progress, 20, 44, '.fade1')
        // opacityImage(progress, 83, 117, '.fade2')
        // opacityImage(progress, 200, 300, '.fade3', fadeOutEffect)
        // opacityImage(progress, 130, 170, '.cycle1', memoryEffect)
        // opacityImage(progress, 150, 200, '.cycle2', memoryEffect)
      },
      opacityImage = function(
        progress,
        start,
        end,
        imgSelector,
        customizedFunc
      ) {
        if (progress > start && progress < end) {
          var img = document.querySelector(imgSelector)
          if (img && img.style) {
            img.style.opacity =
              (customizedFunc && customizedFunc(progress, start, end)) ||
              (progress - start) / (end - start)
          }
        }
      },
      memoryEffect = function(progress, start, end) {
        // Range : 0.1 ~ 1
        return 0.1 + (Math.sin((Math.PI * progress) / 10) + 1) * 0.45
      },
      fadeOutEffect = function(progress, start, end) {
        return 1 - (progress - start) / (end - start)
      }
    body.addEventListener('scroll', function(e) {
      scrollTop = body.scrollTop
      console.log('scroll', window.pageYOffSet)
      var progress = getProgress(),
        // Gate 33 233 433 = 33 + n * 200
        threshold = Math.floor((progress + 167) / 200)
      doScroll(scrollTop)
      fadeInOutHandler(progress)
      if (prevThreshold === threshold) {
        return
      }
      prevThreshold = threshold
    })
  }, [])
  return (
    <>
      <div class="parallax">
        {/* <Header /> */}
        <Carousel autoPlay="true" infiniteLoop="true">
          <div>
            <img src={imageh1} />
            <p className="legend">
              <a href="https://www.e3expo.com/">
                2020 E3電玩展 因武漢肺炎疫情 停辦一次
              </a>
            </p>
          </div>
          <div>
            <img src={imageh2} />
            <p className="legend">
              <a href="https://tgs.tca.org.tw/index_portal.php">
                2020 台北國際電玩展 因武漢肺炎疫情 停辦一次
              </a>
            </p>
          </div>
          <div>
            <img src={imageh3} />
            <p className="legend">
              <a href="https://www.playstation.com/en-us/explore/ps5/">
                PlayStation5 即將上市
              </a>
            </p>
          </div>
          <div>
            <img src={imageh4} />
            <p className="legend">
              <a href="https://www.nintendo.co.jp/">
                無料アップデートで広がる島ぐらし。『あつまれ
                どうぶつの森』で季節のイベント「イースター」開催！
              </a>
            </p>
          </div>
        </Carousel>

        <div class="parallax__group">
          <div
            class="parallax__layer parallax__layer--fore"
            style={{ top: -17489.5 }}
          >
            {/* <div class="full-screen" style={{ backgroundColor: `#79cee2` }}>
              <div class="title">FIRST PAGE</div>
            </div> */}
            <div class="fore fade1" style={{ opacity: 0.958333 }}>
              <div class="title">FIRST FORE</div>
            </div>
            <div class="fore right">
              <div class="title">FORE2</div>
            </div>
            <div class="fore center">
              <div class="title">FORE3</div>
            </div>
            <div class="fore center">
              <div class="title">FORE4</div>
            </div>
            <div class="fore right cycle1" style={{ opacity: 0.977975 }}>
              <div class="title">FORE5</div>
            </div>
            <div class="fore center">
              <div class="title">FORE6</div>
            </div>
            <div class="fore">
              <div class="title">FORE7</div>
            </div>
            <div class="fore right">
              <div class="title">FORE8</div>
            </div>
          </div>

          <div
            class="parallax__layer parallax__layer--base"
            style={{ top: -9994 }}
          >
            <div class="shot" style={{ marginTop: 300 }}>
              <div class="title">FIRST BASE</div>
            </div>
            <div class="shot fade2" style={{ opacity: 0.970588 }}>
              <div class="title">BASE2</div>
            </div>
            <div class="shot cycle2" style={{ opacity: 0.1 }}>
              <div class="title">BASE3</div>
            </div>
            <div class="shot">
              <div class="title">BASE4</div>
            </div>
            <div class="shot">
              <div class="title">BASE5</div>
            </div>
            {/* <div class="shot">
              <div class="title">BASE6</div>
            </div> */}
            {/* <div class="shot">
              <div class="title">BASE7</div>
            </div> */}
          </div>

          <div
            class="parallax__layer parallax__layer--back"
            style={{ top: -2498 }}
          >
            <div class="card" style={{ marginTop: 100 }}>
              <div class="title">BACK1</div>
            </div>
            <div class="card">
              <div class="title">BACK2</div>
            </div>
            <div class="card fade3" style={{ opacity: 0.03 }}>
              <div class="title">BACK3</div>
            </div>
            <div class="card">
              <div class="title">BACK4</div>
            </div>
            <div class="card" style={{ background: `rgba(0,0,0,0.6)` }}>
              <div class="title">BACK5</div>
            </div>
            {/* <div class="card">
              <div class="title">BACK6</div>
            </div> */}
          </div>

          <div class="parallax__layer parallax__layer--deep">
            <div class="full-screen">
              <img src={image1} />
            </div>
            <div class="full-screen">
              <img src={image2} />
            </div>
            <div class="full-screen">
              <img src={image3} />
            </div>
            <div class="full-screen">
              <img src={image4} />
            </div>
            {/* <Footer /> */}
            {/* <div class="full-screen"><img src={imageh3} /></div> */}
            {/* <div class="full-screen">
              <img src={image2} />
            </div> */}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default Home
