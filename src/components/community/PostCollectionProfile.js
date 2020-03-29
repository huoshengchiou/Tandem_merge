import React, { useState, useEffect } from 'react'
import { AiOutlineStar } from 'react-icons/ai'

export default function PostCollectionProfile(props) {
  const [collection, setCollection] = useState([])
  //   const [collected, setCollected] = useState(false)

  const getCollection = () => {
    // console.log('collection', props)
    // 注意資料格式要設定，伺服器才知道是json格式
    postCollection(props)
    async function postCollection() {
      // 注意資料格式要設定，伺服器才知道是json格式
      const request = new Request(
        'http://localhost:6001/posts/getpostcollection',
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(props),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      const response = await fetch(request)
      const data = await response.json()
      console.log(data)
      setCollection(data)
    }
  }
  useEffect(() => {
    getCollection()
  }, [])
  console.log('collection', collection)
  return (
    <div className="d-flex flex-wrap">
      {collection.map((v, i) => {
        return (
          <div className="" key={i}>
            <figure
              className="C-profilePostFigure"
              onClick={() => {
                window.location.href = `/postDetailProfile/${v.post_id}`
              }}
            >
              <>
                <img
                  src={`http://localhost:6001/img/${v.postImg}`}
                  style={{ width: '100%' }}
                />
              </>
            </figure>
          </div>
        )
      })}
    </div>
  )
}
