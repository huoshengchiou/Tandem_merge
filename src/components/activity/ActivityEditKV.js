import React from 'react'
import { Container, Row, Card } from 'react-bootstrap'

function ActivityContnetKV(props) {
  // console.log('Contnetprops', props.aData)
  return (
    <>
      <Container className="aContentKV">
        <Row className="justify-content-center position-relative m-2">
          <section className="aUplodePic position-relative" name="aAddKV">
            <div
              style={{
                width: '686px',
                height: '400px',
              }}
              {...getRootProps({ className: 'dropzone' })}
            >
              <input
                style={{}}
                {...getInputProps()}
                placeholder="Username"
                className="form-control"
                required
              />
              <p className="aFixUpload">
                <AiOutlinePicture
                  style={{
                    display: 'flex',
                    margin: 'auto',
                    fontSize: '50px',
                  }}
                />
                －－新增文宣檔案，點擊或拖曳圖片至此－－
              </p>
              <aside className="position-absolute" style={thumbsContainer}>
                {thumbs}
              </aside>
            </div>
          </section>
          <div className="aContentCatgory position-absolute">
            <h3>{props.aData.aCategoryName}</h3>
          </div>
          <Card.Img variant="top" src={`/images/activity/${props.aData.aKV}`} />
          <div className="aContentPageName position-absolute">
            <h1>{props.aData.aName}</h1>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default ActivityContnetKV
