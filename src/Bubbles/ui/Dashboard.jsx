import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import "./dashboard.css"
import { GetUserBubbles } from "../use-cases/getUserBubbles"
import { GetBubbleUsers } from "../use-cases/getBubbleUsers"
import { AddNewBubble } from "../use-cases/addNewBubble"
import Nav from "../../login/ui/nav"
import {UpdateUserStatus} from "../use-cases/updateUserStatus"

import { Image, Dropdown, Input, Button, Card, Header, Icon } from 'semantic-ui-react'


export const Dashboard = ({ bubbles, getBubbles, addNewBubble, getBubbleUsers, updateUserStatus, user}) => {
   const [loading, setLoading] = useState(true)
   const [adding, setAdding] = useState(false)
   const [fields, setFields] = useState({})
   const [userStatus, setUserStatus] = useState('green')
   const [statusText, setStatusText] = useState('Healthy')

   let status = user.user.user_status
   
   // if (userStatus === 'green') {
   //   let statusText = "You are healthy"
   // } else if (userStatus === 'yellow') {
   //    let statusText = "You are at risk"
   // } else if (userStatus === 'red') {
   //    let statusText = "You are sick"
   // }



   const setField = (evt) =>
      setFields({
         ...fields,
         [evt.target.name]: evt.target.value
      })
   console.log(fields)

   console.log(bubbles.bubbleList)

   useEffect(() => {
      getBubbles(8)
   }, [])


   if (bubbles.bubbleList === []) {
   }

   else {
      const list = bubbles.bubbleList
      const userId = 10
      
      const handleUpdateStatus = (evt) => {
         console.log(evt.target.value)
         
         setUserStatus(evt.target.value)

         

      }

      return (
         <div className="dashboard-container">
            <div className='nav-component-container'>
               <Nav />
            </div>
            <div className="dashboard-username">John Smith</div>
            <Image src="stock-profile.png" className={"profile-image image-" + status}/>
            <div className= {"dashboard-status " + status}>{statusText}</div>

            <div className="user-status-container">
            {/* <Dropdown className="select-status"
               placeholder='Select Status'
               fluid
               selection
               name = 'selected-status'
               onChange = {handleUpdateStatus}
            /> */}
            <select onChange={handleUpdateStatus}>
               <option value="green">I am healthy</option>
               <option value="yellow">I am at risk</option>
               <option value="red">I am sick</option>
            </select>
            <Button onClick = {() => {
               updateUserStatus(userStatus)

               if (userStatus === 'green') {
                 setStatusText("Healthy")
               } else if (userStatus === 'yellow') {
                  setStatusText("At Risk")
               } else if (userStatus === 'red') {
                  setStatusText("Sick")
               }
               
               }}>Update Status</Button>
            </div>
            
            {(adding === true) ?
               <div className="add-to-bubble">
                  <Input className="status-input" placeholder="Create new bubble"
                     name="title"
                     type="text"
                     value={fields.title}
                     onChange={setField}>
                  </Input>
                  <button className="" onClick={() => addNewBubble(fields, userId)}>Add</button>
               </div>
               :
               <Button primary onClick={() => setAdding(true)}>Create a new Bubble</Button>
            }

            <div className="bubble-lists"> Your Bubbles </div>
            <div>
               {list.map((item) => (
                  <Link to = {`/bubbles/${item.id}`}> 
                     <Card
                        key={item.id}
                        header={item.title}
                        meta='Test'
                        description='A group for friends'
                     >
                        <div className="card-headers">
                           <Header as='h3'>{item.title}</Header>
                           <Icon name='trash' ></Icon>
                        </div>
                     </Card>
                  </Link>
         
               ))}
            </div>
         </div>
      )
   }


}

const mapStateToProps = (state, { bubbles }) => ({
   bubbles: state.bubble,
   user: state.user
})

const mapDispatchToProps = (dispatch) => ({
   getBubbles: GetUserBubbles(dispatch),
   addNewBubble: AddNewBubble(dispatch),
   updateUserStatus: UpdateUserStatus(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)