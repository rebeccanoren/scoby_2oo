import React from 'react'

function UserItems(props) {

  // console.log(props)
  return (
    <React.Fragment>
      {props.item.map((item, index) => {
        return (
          <div className="CardItem" key={index}>
            <div className="description" >
              <div className="round-image"><img src={item.image} alt="" /></div>
              <h2>{item.name}</h2>
              <h4>{item.quantity}</h4>
              <p>{item.description}</p>

              <div className="buttons">
                <span>
                  <button className="btn-secondary" onClick={() => props.deleteCb(item._id)}>Delete</button>
                </span>
                <span>
                  <button className="btn-primary">Edit</button>
                </span>
              </div>
            </div>
          </div>
        )
      })}

    </React.Fragment>

  )
}

export default UserItems
