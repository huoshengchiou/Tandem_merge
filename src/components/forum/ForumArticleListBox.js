import React, { useState, useEffect } from 'react'
import { withRouter, Switch, Route, Link } from 'react-router-dom'
// import { NavLink } from 'react-bootstrap'
//redux
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { getArticleData } from '../../actions/articleActions'
// import { NavLink } from 'react-bootstrap'
import { AiOutlineUser, AiOutlineFile, AiOutlineMessage } from 'react-icons/ai'
import ArticleTag from '../../components/forum/ArticleTag'
import '../../css/forum.scss'

function ForumArticleListBox(props) {
  return (
    <>
      <div class="f-hot-post">
        <div class="row f-vertical-gap">
          <div class="col-lg-3 col-md-5">
            <a href="" class="f-hot-post-img">
              <img
                src={`./images/forum/article${props.data.articleId}.jpg`}
                // src="./images/forum/post-7-mid-square.jpg"
                alt="At length one of them called out in a clear"
              />
              <ArticleTag tagName={props.tagName} />
            </a>
          </div>
          <div class="col-lg-9 col-md-7">
            <div>
              <div class="f-gap"></div>
              <h2 class="f-post-list-title h4">
                <Link to={'./article/' + props.data.articleId}>
                  {props.data.articleName}
                </Link>
              </h2>
              {/* <div class="f-gap"></div> */}
              <div class="f-hot-post-date mt-10 mb-10 d-flex">
                <AiOutlineUser />
                <a href="#">{props.data.articleAuthor}</a>
                <div class="f-gap-article-list"></div>
                <AiOutlineFile />
                <span>{props.data.created_at}</span>
                <div class="f-gap-article-list"></div>
                <AiOutlineMessage />
                <a href="#">12 comments</a>
              </div>
              <div class="f-gap"></div>
              <div class="f-hot-post-text">
                <p>{props.data.articleContent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForumArticleListBox
