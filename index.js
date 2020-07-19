const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.zacks.com/stock/quote/AAPL";

axios
  .get(url)
  .then((response) => {
    const html = response.data;
    const rank = getRank(html);
    const styleScores = getVGM(html);
    const [value, growth, momentum, vgm] = styleScores;
    console.log({ rank, value, growth, momentum, vgm });
  })
  .catch((error) => {
    console.log(error);
  });

const getRank = (html) => {
  const $ = cheerio.load(html);
  const rankString = $(".zr_rankbox .rank_view").text();
  const rank = parseInt(rankString);
  return rank;
};

const getVGM = (html) => {
  const $ = cheerio.load(html);
  const data = [];
  $(".zr_rankbox.composite_group .rank_view .composite_val").each(
    (i, element) => {
      data.push($(element).text());
    }
  );
  return data;
};

// const url = "https://quote-feed.zacks.com/index.php?t=TSLA";

// axios
//   .get(url)
//   .then((response) => {
//     const data = response.data;
//     console.log(data.TSLA.zacks_rank);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
