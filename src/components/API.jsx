import axios from 'axios';

const ads = (query) => {
  return axios({
    method: 'get',
    url: `https://fakestoreapi.com/products/${query}`,
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((error) => {
      return alert(`${error.response.data}`);
    });
};

export { ads };
