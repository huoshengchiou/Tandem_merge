import React, { useState, useEffect } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
// import { NavLink } from 'react-bootstrap'
//redux
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { getArticleData } from '../../actions/articleActions'
// import { NavLink } from 'react-bootstrap'
import {
  AiOutlineGithub,
  AiOutlineHighlight,
  AiOutlineSolution,
  AiOutlineUser,
  AiOutlineFile,
  AiOutlineMessage,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineGoogle,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineLinkedin,
} from 'react-icons/ai'
import ArticleTag from '../../components/forum/ArticleTag'
import '../../css/forum.scss'
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

function ArticleComments(props) {
  const [comment, setComment] = useState([])
  const articleId = props.match.params.articleId
    ? props.match.params.articleId
    : ''
  function post() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>',
    })
  }

  async function getCommentData(articleId) {
    const request = new Request(
      'http://localhost:6001/article_comments' + articleId,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
    const response = await fetch(request)
    const data = await response.json()
    console.log('留言', data)
    setComment(data[0])
  }

  useEffect(() => {
    // console.log('dddd', props)
    getCommentData(articleId)
  }, [])
  //   useEffect(() => {
  //     console.log('comment', props)
  //     props.getCommentData()
  //   }, [])
  console.log('comment', props)
  return (
    <>
      {/* 留言內容 */}
      <div class="f-gap-3"></div>
      <div id="comments"></div>
      <h3 class="f-latest-title">
        <span>
          <span class="f-category-text-1">3則</span> 評論
        </span>
      </h3>

      <div class="f-gap"></div>
      <div class="f-comments">
        <div class="f-comment">
          <div class="f-comment-meta">
            <img
              src="../../images/forum/avatar-2.jpg"
              alt="Witch Murder"
              class="rounded-circle"
              width="35"
            />{' '}
            by <a href="#">Witch Murder</a> in 20 September, 2018
            <button
              href="#"
              class="f-index-btn f-index-btn-rounded f-index-btn-color float-right"
            >
              Reply
            </button>
          </div>
          <div class="f-comment-text">
            <p>
              {comment.content}
              {/* This sounded nonsense to Alice, so she said nothing, but set off
              at once toward the Red Queen. To her surprise, she lost sight of
              her in a moment, and found herself walking in at the front-door
              again. */}
            </p>
          </div>

          <div class="f-comment">
            <div class="f-comment-meta">
              <img
                src="../../images/forum/avatar-1.jpg"
                alt="Hitman"
                class="rounded-circle"
                width="35"
              />{' '}
              by <a href="#">Hitman</a> in 20 September, 2018
              <button
                href="#"
                class="f-index-btn f-index-btn-rounded f-index-btn-color float-right"
              >
                Reply
              </button>
            </div>
            <div class="f-comment-text">
              <p>
                To her surprise, she lost sight of her in a moment, and found
                herself walking in at the front-door again.
              </p>
            </div>
          </div>
        </div>

        <div class="f-comment">
          <div class="f-comment-meta">
            <img
              src="../../images/forum/avatar-3.jpg"
              alt="Wolfenstein"
              class="rounded-circle"
              width="35"
            />{' '}
            by <a href="#">Wolfenstein</a> in 21 September, 2018
            <button
              href="#"
              class="f-index-btn f-index-btn-rounded f-index-btn-color float-right"
            >
              Reply
            </button>
          </div>
          <div class="f-comment-text">
            <p>
              The sight of the tumblers restored Bob Sawyer to a degree of
              equanimity which he had not possessed since his interview with his
              landlady. His face brightened up, and he began to feel quite
              convivial.
            </p>
          </div>
        </div>
      </div>

      {/* 留言回應 */}
      <div class="f-gap-3"></div>
      <h3 class="f-latest-title">
        <span>
          <span class="f-category-text-1">留言</span> 回覆
        </span>
      </h3>

      <div class="f-gap"></div>
      <div class="f-reply">
        <form action="#" class="f-form" novalidate="novalidate">
          <div class="row f-sm-gap f-vertical-gap">
            <div class="col-md-4">
              <input
                type="email"
                class="form-control required"
                name="email"
                placeholder="Email *"
              />
            </div>
            <div class="col-md-4">
              <input
                type="text"
                class="form-control required"
                name="name"
                placeholder="Name *"
              />
            </div>
            <div class="col-md-4">
              <input
                type="text"
                class="form-control"
                name="name"
                placeholder="Website"
              />
            </div>
          </div>

          <div class="f-gap-1"></div>
          <textarea
            class="form-control required"
            name="message"
            rows="5"
            placeholder="Message *"
            aria-required="true"
          ></textarea>

          <div class="f-gap-1"></div>
          <div class="f-form-response-success"></div>
          <div class="f-form-response-error"></div>
          <button
            onClick={() => post()}
            class="f-index-btn f-index-btn-rounded f-index-btn-color"
            id="post"
          >
            留言
          </button>
        </form>
      </div>
    </>
  )
}

export default withRouter(ArticleComments)
