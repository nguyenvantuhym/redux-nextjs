import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import { addItem, initdata, editItem, deleteItem  } from '../store'
//import Examples from '../components/examples'

class Index extends React.Component {
    static getInitialProps = async ()=>{
        console.log("a")
        //let res = await axios.get('/getdata');
        return{};
    }
   componentDidMount= async() =>{

    let res = await axios.get('/getdata');
    let dispatch = this.props.dispatch;
    dispatch(initdata(res.data.data));
    console.log(res.data.data);
   }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(e.target.elements.abc.value);
        this.dispatch(e.target.elements.abc.value);
        e.target.elements.abc.value = "";
    }
  dispatch(item){
    let dispatch = this.props.dispatch;
    dispatch(addItem(item));
  }
  render () {
    return(
       <div>
           <form onSubmit={this.handleSubmit}>
           <input type="text" name='abc' />
           <button type="submit">theem</button>
           </form>
            <ul>
           {this.props.listItem.map((item,i)=>{
               return(
                   <li key={i}>{item}</li>
               )
           })}
        </ul>
       </div>
    )
  }
}

export default connect(function todos(state){
    return{listItem : state.listItem}
}
)(Index)