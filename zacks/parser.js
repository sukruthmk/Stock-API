const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.zacks.com/stock/quote/";

exports.getZacksData = async (ticker) => {
  const tickerURL = url + ticker;
  let result = null;
  try {
    const response = await axios.get(tickerURL);
    if (response && response.data) {
      const html = response.data;
      const rank = getRank(html);
      const styleScores = getVGM(html);
      const [value, growth, momentum, vgm] = styleScores;
      result = { ticker, rank, value, growth, momentum, vgm };
    }
  } catch (e) {
    console.error(e);
  }
  return result;
};

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
