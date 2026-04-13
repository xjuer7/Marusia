export const BASE_URL = '/api';
export const MOVIES_URL = 'https://api.poiskkino.dev';

// export const defaultConfig = {
//     headers: {
//         'X-API-KEY': 'M5XWY75-ZMN4VC4-G86Z5FN-EHD5SG3',
//   }
// }

export const defaultConfig = {
    headers: {
        'X-API-KEY': '2ZYSAWF-7DPMCWM-JR33H9F-NQ6ZEA1',
  }
}




fetch(`${MOVIES_URL}/v1.4/movie?genres.name=${encodeURI('анимэ')}`, {
  headers: {
    'X-API-KEY': '2ZYSAWF-7DPMCWM-JR33H9F-NQ6ZEA1'
  }
})

