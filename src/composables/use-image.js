import { getDownloadURL, ref as refStorage, uploadBytesResumable } from 'firebase/storage'
import { uid } from 'uid'
import { computed, ref } from 'vue'
import { useFirebaseStorage } from 'vuefire'

export default function useImage() {
  const url = ref('')
  const storage = useFirebaseStorage()

  const onFileChange = (e) => {
    const file = e.target.files[0]

    const fileName = uid() + '.jpg' 

    const storageRef = refStorage(storage, `images/${fileName}`)

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed', () => {
      
    }, (error) => {
      console.log(error)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        url.value = downloadURL
      })
    })
  }

  const isUploaded = computed(() => {
    return url.value ? url.value : null
  })

  return {
    onFileChange,
    isUploaded,
    url
  }
}