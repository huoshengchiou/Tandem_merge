import React, { useState, useEffect } from 'react'
import UploadFile from '../../components/community/UploadFile'
import UploadText from '../../components/community/UploadText'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Swal from 'sweetalert2'

export default function AddPost(props) {
  // console.log(props)
  const [contentfromchild, setContentfromchild] = useState('')
  const [titlefromchild, setTitlefromchild] = useState('')
  const [imagefromchild, setImagefromchild] = useState('')
  const [categoryfromchild, setCategoryfromchild] = useState('')
  const [loginUserId, setLoginUserId] = useState('')

  useEffect(() => {
    const getDatafromlocal = JSON.parse(localStorage.getItem('LoginUserData'))
    const input = { mbId: getDatafromlocal.mbId }
    // const jsonInput = JSON.stringify(input)

    setLoginUserId(input.mbId)
    console.log(input.mbId)
  }, [])

  const handleSubmit = () => {
    if (!imagefromchild) {
      return Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '請選擇圖片！',
      })

      // aNameInput.current.focus()
    }
    // } else if (!aLimit) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: '錯誤',
    //     text: '至少兩人才能舉辦活動喲！',
    //   })
    //   aLimitInput.current.focus()
    // } else if (!aBudget) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: '錯誤',
    //     text: '若無預算請填寫0元',
    //   })
    //   aBudgetInput.current.focus()
    // } else if (!aCostTime) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: '錯誤',
    //     text: '最低時數是半小時喲！',
    //   })
    //   aCostTimeInput.current.focus()
    // } else if (!aCategoryId) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: '錯誤',
    //     text: '請選擇活動類別！',
    //   })
    //   aCategoryIdInput.current.focus()
    // } else if (!aDate) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: '錯誤',
    //     text: '別忘了活動日期！',
    //   })
    //   aDateInput.current.focus()
    // } else if (!aStartDate || !aEndDate) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: '錯誤',
    //     text: '報名時間要設定喲！！',
    //   })
    //   aStartDateInput.current.focus()
    // } else if (!aContent) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: '錯誤',
    //     text: '請描述一下這次要辦的活動是怎樣的活動～',
    //   })
    //   aContentInput.current.focus()
    // } else if (!aLocation) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: '錯誤',
    //     text: '地址記得填喲！',
    //   })
    //   aLocationInput.current.focus()
    // }
    // async function sendDatatoServer(postData, callback) {
    // 注意資料格式要設定，伺服器才知道是json格式

    const formdata = new FormData()
    formdata.append('communityImage', imagefromchild[0])
    formdata.append('title', titlefromchild)
    formdata.append('content', contentfromchild)
    formdata.append('category', categoryfromchild)
    formdata.append('memberId', loginUserId)
    console.log(imagefromchild)
    addNewPosttoServer(
      formdata,
      Swal.fire({
        icon: 'success',
        title: '貼文新增成功',
        showConfirmButton: false,
        timer: 2000,
      }).then(r => {
        window.location.href = `/Communityprofile/${loginUserId}`
      })
    )

    async function addNewPosttoServer(formdata) {
      // 注意資料格式要設定，伺服器才知道是json格式
      const request = new Request('http://localhost:6001/items/uploaditem/', {
        method: 'POST',
        credentials: 'include',
        body: formdata,
        headers: new Headers({
          Accept: 'application/json',
        }),
      })
      console.log('JSON.stringify(formdata)')

      const response = await fetch(request)
      const data = await response.json()
      console.log('from addpost :', data)
      // callback()
    }
  }

  return (
    <>
      <div
        className="container"
        style={{ marginBottom: '60px', marginTop: '20px' }}
      >
        <div className="row">
          <div className="col-1"></div>
          <form
            className="col-11"
            style={{ boxShadow: '0px 0px 10px #adb6bd' }}
          >
            {/* 發布和取消按鈕 */}

            <div className="m-3 d-flex justify-content-end">
              <AiOutlineCloseCircle
                style={iconStyle}
                className="d-block"
                onClick={() => {
                  Swal.fire({
                    title: '確定要離開畫面嗎？',
                    // text: '确定離開畫面吗？',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#79cee2',
                    cancelButtonColor: '#F9A451',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                  }).then(result => {
                    if (result.value) {
                      window.location.href = `/Communityprofile/${loginUserId}`
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                    }
                  })
                }}
              />
            </div>

            {/* 上傳區塊                 */}
            <div className="d-flex">
              <UploadFile
                getStateImagefromchild={value => {
                  console.log(value)
                  setImagefromchild(value)
                }}
              />
              <UploadText
                getStateContentfromchild={value => {
                  // console.log(value)
                  setContentfromchild(value)
                }}
                getStateTitlefromchild={value => {
                  // console.log(value)

                  setTitlefromchild(value)
                }}
                getStateCategoryfromchild={value => {
                  // console.log('category', value)

                  setCategoryfromchild(value)
                }}
              />
            </div>
            <div
              className="postbuttonStyle"
              onClick={() => {
                handleSubmit()
              }}
            >
              <span>發布</span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const iconStyle = {
  fontSize: '30px',
  color: '#F9A451',
  cursor: 'pointer',
}
