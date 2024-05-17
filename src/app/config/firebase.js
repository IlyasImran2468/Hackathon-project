import { getAuth, createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FacebookAuthProvider } from "firebase/auth"; // Import FacebookAuthProvider

const firebaseConfig = {
    apiKey: "AIzaSyDDoXfjqATNwUK4s1tdVTAke6ueAdZNBXU",
    authDomain: "hackathon-project-734b6.firebaseapp.com",
    projectId: "hackathon-project-734b6",
    storageBucket: "hackathon-project-734b6.appspot.com",
    messagingSenderId: "850931415198",
    appId: "1:850931415198:web:bad4e7ef343595c926a38f"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const fbAuthProvider = new FacebookAuthProvider(); // Initialize FacebookAuthProvider

const signUp = async (userInfo) => {
    const { email, password } = userInfo;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        alert(e.message);
    }
};

const adPosts = async (info) => {
    const { des, img } = info;

    // try {
    //     // Create a storage reference for the image
    //     const storageRef = ref(storage, `post/${img}`);

    //     // Upload the image file to Firebase Storage
    //     await uploadBytes(storageRef, img);

    //     // Get the download URL of the uploaded image
    //     const imgURL = await getDownloadURL(storageRef);

    //     // Add a document to the Firestore collection "post" with the description and image URL
    //     await addDoc(collection(db, "post"), {
    //         des,
    //         img: imgURL
    //     });

    //     // Alert the user that the post has been added successfully
    //     alert('Post Added!');

    //     // Reload the window to reflect the changes (you may want to consider a better UX flow)
    //     window.location.reload();
    // } catch (e) {
    //     // Handle any errors that occur during the upload or data addition
    //     alert(e.message);
    // }

    try {
        // const { img, des } = info;
        console.log({img, des})
        const storageRef = ref(storage, `images/${img.name}`);
        await uploadBytes(storageRef, img);
        const imgUrl = await getDownloadURL(storageRef);
        console.log(imgUrl);
        await addDoc(collection(db, "post"), {
         des,
          img: imgUrl,
        });
        alert("Posted");
        window.location.reload();
      } catch (e) {
        alert(e.message);
      }
    
};

const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "post"));
    const allPosts = [];
    querySnapshot.forEach((doc) => {
        allPosts.push(doc.data());
    });
    return allPosts;
};

const FacebookAuth = async () => {
    try {
        const fbAuth = await signInWithPopup(auth, fbAuthProvider);
        return fbAuth;
    } catch (e) {
        alert(e.message);
    }
};

export {
    signUp,
    signOut,
    adPosts,
    getPosts,
    FacebookAuth
};
