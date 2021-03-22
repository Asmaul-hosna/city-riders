import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';

const Login = () => {
if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);

}


const [newUser,setNewUser] = useState(false);
const[user,setUser] = useState({
  isSignedIn: false,
  newUser:false,
  name: '',
  email:'',
  password:'',
  photo:''

});
const [loggedInUser, setLoggedInUser] = useContext(UserContext);

const provider = new firebase.auth.GoogleAuthProvider();
const handleSignIn = () =>{
  firebase.auth().signInWithPopup(provider)
  .then(res=>{
    const{displayName,photoURL,email} = res.user;
    const signedInUser ={
      isSignedIn: true,
      name:displayName,
      email:email,
      photo: photoURL

    }
    setUser(signedInUser);
    console.log(displayName,email,photoURL);
  })
  .catch(err =>{
    console.log(err);
    console.log(err.message);

  })
 
}

const handleSignOut = () => {
 firebase.auth().signOut ()
 .then(res =>{
   const signedOutUser={
     isSignedIn: false,
     newUser:false,
     name:'',
     photo:'',
     email:'',
     error:'',
     success:false

   }
   setUser(signedOutUser)
   console.log(res);
 })
 .catch(err =>{

 })

 }
 const handleBlur=(e)=>{
    let isFieldValid= true;
    if(e.target.name=== 'email'){
      isFieldValid =  /\S+@\S+\.\S+/.test(e.target.value);
     
   }
   if(e.target.name==='password'){
     const isPasswordValid = e.target.value.length > 6;
     const passwordHasNumber = /\d{1}/.test(e.target.value);
     isFieldValid=isPasswordValid && passwordHasNumber;

   }
   if(isFieldValid){
        //  [...cart,newItem]
        const newUserInfo = {...user};
        newUserInfo[e.target.name]=e.target.value;
        setUser(newUserInfo);

   }
 }
 const handleSubmit =(e) =>{
  //  console.log(user.email,user.password)
   if(newUser && user.email && user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res =>{
      const newUserInfo = {...user}
      newUserInfo.error='';
      newUserInfo.success =true;
      setUser(newUserInfo);
      updateUserName(user.name);
     
     
     
    })
    .catch(error=>{
      const newUserInfo = {...user};
      newUserInfo.error =error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
     
     
     
      
    })
      
  }
  

   if(!newUser && user.email && user.password) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res =>{
      const newUserInfo = {...user}
      newUserInfo.error='';
      newUserInfo.success =true;
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo);
      console.log('sign in user info',res.user);
     })
    .catch(function(error){
      const newUserInfo = {...user};
      newUserInfo.error =error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
     
    })
    
  
    
   
     
    
  

   }
  
  e.preventDefault();

  }

   const updateUserName =name =>{
     const user = firebase.auth().currentUser;

     user.updateProfile({
      displayName: name
    }).then(function() {
     console.log('user name updated successfully')
    }).catch(function(error) {
      console.log(error)
    })

  
   }
   

     

return(
<div style={{textAlign:'center'}}>
<div >
<form onSubmit={handleSubmit}>
    <input type="text" name="email" onBlur={handleBlur}  placeholder="Your email address" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required/>
        <br/>
       <input type="submit" value={newUser ? 'sign up':'sign in'}/>
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {user.success && <p style={{color:'green'}}>user{newUser ? 'created':'Logged In'}  successfully </p>}
      </div>
</div>
    );
};

export default Login;