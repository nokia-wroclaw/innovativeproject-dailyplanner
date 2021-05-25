import firebase from '../config/firebase-config';

const socialMediaAuth = (provider) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => res)
    .catch((err) => err);
};

export default socialMediaAuth;
