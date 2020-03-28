import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Container,
  Row,
  Card,
  Col,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useHistory } from 'react-router-dom'
//檔案上傳套件
import { useDropzone } from 'react-dropzone'
import { AiOutlinePicture } from 'react-icons/ai'
import '../../css/forum.scss'

// 圖檔上傳設定
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  top: 0,
  left: '40px',
}
const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 600,
  height: 400,
  padding: 4,
  boxSizing: 'border-box',
}
const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}
const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
}

function ArticlePost(props) {
  const history = useHistory()
  //文章類型 , 主題類型 , 文章標題 , 文章內容 , 文章圖檔
  const [articleCategory, setArticleCategory] = useState('')
  const [articleClass, setArticleClass] = useState('')
  const [articleName, setArticleName] = useState('')
  const [articleContent, setArticleContent] = useState('')
  const [articleImage, setArticleImage] = useState('')
  const [files, setFiles] = useState([])

  //圖檔上傳設定
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="uploadpic" />
      </div>
    </div>
  ))

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  const addNewArticle = () => {
    const addNewPost = {
      articleCategory,
      articleClass,
      articleName,
      articleContent,
      articleImage,
    }
    sendNewArticleDataToServer(addNewPost, redirect)
  }

  async function sendNewArticleDataToServer(addNewPost, callback) {
    const request = new Request(`http://localhost:6001/articles`, {
      method: 'POST',
      body: JSON.stringify(addNewPost),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    // console.log('addNewPost', JSON.stringify(addNewPost))

    const response = await fetch(request)
    const data = await response.json()
    console.log(data)
    callback()
  }

  function redirect() {
    history.goBack()
  }

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="f-gap-2"></div>
            <div class="forum-form">
              <form action="">
                <div class="row">
                  <div class="col-12">
                    <div class="d-flex f-post-category">
                      <label>文章類型：</label>
                      {/* <input name="title" type="text" placeholder="Enter topic title here"/> */}
                      <DropdownButton
                        className="f-post-dropdown"
                        title="選擇文章類型"
                        name="articleCategory"
                        id="articleCategory"
                        required
                        onChange={e => setArticleCategory(e.target.value)}
                      >
                        <Dropdown.Item>技術研討</Dropdown.Item>
                        <Dropdown.Item>原畫創作</Dropdown.Item>
                        <Dropdown.Item>廠商徵才</Dropdown.Item>
                      </DropdownButton>
                    </div>
                    <div class="f-gap"></div>
                    <div class="d-flex f-post-category">
                      <label>主題類型：</label>
                      {/* <input name="title" type="text" placeholder="Enter topic title here"/> */}
                      <DropdownButton
                        className="f-post-dropdown"
                        title="選擇主題類型"
                        name="articleClass"
                        id="articleClass"
                        required
                        onChange={e => setArticleClass(e.target.value)}
                      >
                        <Dropdown.Item>技術分享</Dropdown.Item>
                        <Dropdown.Item>問題求解</Dropdown.Item>
                        <Dropdown.Item>聯合創作</Dropdown.Item>
                        <Dropdown.Item>情報分享</Dropdown.Item>
                        <Dropdown.Item>輕鬆閒聊</Dropdown.Item>
                      </DropdownButton>
                    </div>
                    <div class="f-gap"></div>
                  </div>

                  <div class="f-gap-3"></div>
                  <div class="col-12">
                    <div class="single-input mb-50 mb-sm-30 mb-xs-20">
                      <label>標題：</label>
                      <input
                        type="text"
                        placeholder="Enter topic title here"
                        name="articleName"
                        id="articleName"
                        required
                        onChange={e => setArticleName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="f-gap-2"></div>
                  <div class="col-12">
                    <div class="single-input mb-50 mb-sm-30 mb-xs-20">
                      <label>文章內容：</label>
                      <CKEditor
                        editor={ClassicEditor}
                        data="<p>Hello from CKEditor 5!</p>"
                        onInit={editor => {
                          // You can store the "editor" and use when it is needed.
                          console.log('Editor is ready to use!', editor)
                        }}
                        name="articleContent"
                        id="articleContent"
                        required
                        // onChange={e => setArticleContent(e.target.value)}
                        onChange={(event, editor) => {
                          const data = editor.getData()
                          console.log({ event, editor, data })
                        }}
                        onBlur={(event, editor) => {
                          console.log('Blur.', editor)
                        }}
                        onFocus={(event, editor) => {
                          console.log('Focus.', editor)
                        }}
                      />
                    </div>
                  </div>

                  <Col md={8} className="text-center f-post-image-zone">
                    <section
                      className="aUplodePic position-relative"
                      name="aKV"
                    >
                      <div
                        style={{ width: '500px' }}
                        {...getRootProps({ className: 'dropzone' })}
                      >
                        <input
                          style={{}}
                          {...getInputProps()}
                          placeholder="Username"
                          required
                        />
                        <p>
                          <AiOutlinePicture
                            style={{
                              display: 'flex',
                              margin: 'auto',
                              fontSize: '50px',
                            }}
                          />
                          －－新增圖片檔案，點擊或拖曳圖片至此－－
                        </p>
                        <aside
                          className="position-absolute"
                          style={thumbsContainer}
                        >
                          {thumbs}
                        </aside>
                      </div>
                    </section>
                  </Col>

                  <div class="f-gap-3"></div>
                  <div class="col-12 f-article-post-btn ">
                    <button
                      href="#"
                      class="f-index-btn f-index-btn-rounded f-index-btn-color"
                      onClick={() => addNewArticle()}
                      onSubmit
                    >
                      留言
                    </button>
                    {/* <button class="f-index-btn f-index-btn-rounded f-index-btn-color">留言</button> */}
                  </div>
                  <div class="f-gap-3"></div>

                  {/* <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                            <i className="fas fa-pencil-alt prefix"></i>
                                            </span>
                                        </div>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                                    </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticlePost
