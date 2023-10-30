// s.js

const videoFile = document.getElementById('video-file');
const progressBar = document.getElementById('progress');

videoFile.addEventListener('change', (e) => {
  const file = e.target.files[0];

  if (file) {
    const storageRef = firebase.storage().ref();
    const videoRef = storageRef.child('videos/' + file.name);

    const uploadTask = videoRef.put(file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressBar.style.width = progress + '%';
    }, (error) => {
      console.error('Upload error:', error);
    }, () => {
      console.log('Upload completed');
    });
  }
});
