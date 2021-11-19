import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBVPx7i8-r7cnUakpuIwq-f_P7cNoQB57c",
    authDomain: "knowme-14b70.firebaseapp.com",
    projectId: "knowme-14b70",
    storageBucket: "knowme-14b70.appspot.com",
    messagingSenderId: "679045309071",
    appId: "1:679045309071:web:f38ec87c1b38889f7146fa"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const auth = app.auth();
  const db = app.firestore();

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const signInWithGoogle = async () => {
      try{
         const res = await auth.signInWithPopup(googleProvider);
         const user = res.user;
         const query = await db.collection("users").where("uid","==",user.uid).get();
         if(query.docs.length === 0){
             await db.collection("users").add({
                     uid:user.uid,
                     name:user.displayName,
                     authProvider: "google",
                     email: user.email
                 });
         }
      }
      catch(err){
         console.log(err);
         alert(err.message);
      }
  };

const signInWithEmailAndPassword = async (email,password)=>{
     try{
        await auth.signInWithEmailAndPassword(email,password);
     }
     catch(err){
        console.log(err);
        alert(err.message);
     }
};

const registerWithEmailAndPassword = async (name,email,password)=>{
    try{
      const res = await auth.createUserWithEmailAndPassword(email,password);
      const user = res.user;
      await db.collection().add({
          uid:user.uid,
          name,
          authProvider:"local",
          email
      })
    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const sendPasswordResetEmail = async (email)=>{
    try{
        const res = await auth.sendPasswordResetEmail(email);
        alert('Password reset link sent!');
    }
    catch(err){
        console.log(err);
        alert(err.message);
    }
};

const logout = () =>{
    auth.signOut();
};

export{
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout
}