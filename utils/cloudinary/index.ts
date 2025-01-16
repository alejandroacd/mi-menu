// simple function to upload photo to cloudinary
export const uploadPhotoToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file)
    try {
        const response = await fetch('/api/cloudinary', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        return data.secure_url
    }
    catch (error) {
        return error
    }
}