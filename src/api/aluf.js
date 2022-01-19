import axios from "axios";

export default axios.create({
  baseURL: "https://mizranim-deal.co.il/wp-json/wc/v3",
  params: {
    consumer_key: "ck_6d1006dc645f8728cac052245f267b718e323420",
    consumer_secret: "cs_9b5fb623ade86e15af0f8ff7ca430af11088793c",
  },
});

// ?consumer_key=ck_6d1006dc645f8728cac052245f267b718e323420&consumer_secret=cs_9b5fb623ade86e15af0f8ff7ca430af11088793c
