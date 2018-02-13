export default ({ $axios }) => {
  $axios.setHeader('x-api-key', process.env.APIKEY);
};
