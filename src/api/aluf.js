import axios from "axios";

export default axios.create({
  baseURL: "[API_BASE_URL]",
  params: {
    consumer_key: "[CONSUMER_KEY]",
    consumer_secret: "[CONSUMER_SECRET]",
  },
});

