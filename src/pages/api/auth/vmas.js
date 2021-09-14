const credentialsAuth = (request, response) => {
  if (request.method !== 'POST') {
    // Not supported method
    return response.status(405).end()
  }

  if (request.body.password === 'aprender') {
    // How about using another API to randomly generate user's and avatars? :)
    const platziUser = {
      name: 'Platzi student',
      email: 'student@platzi.com',
      image: 'platzi.png',
    }

    return response.status(200).json(platziUser)
  }

  // Auth failed
  return response.status(401).end()
}

export default credentialsAuth
