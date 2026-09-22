const env = {
  appwrite: {
    endpoint: String(process.env.VITE_APPWRITE_HOST_URL),
    projectId: String(process.env.VITE_APPWRITE_PROJECT_ID),
    apikey: String(process.env.VITE_APPWRITE_API_KEY)
  }
}

export default env