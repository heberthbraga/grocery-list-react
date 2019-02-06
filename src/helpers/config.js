const API_URL = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000/api/v1' : 'https://grocerydealscomparison-api.herokuapp.com/api/v1'
const SECURED_API_URL = `${API_URL}/secured`

export const config = {
  API_URL: API_URL,
  SECURED_API_URL: SECURED_API_URL
}