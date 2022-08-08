const googleScholarService = require("./services/google-scholar");

// models
const userModel = require("./models/user");

main();
async function main() {
  try {
    const userRes = await googleScholarService.getAuthor("2Ysvz_QAAAAJ");
    const userFetched = userRes.data;

    let {
      author: { name, affiliations, email, website, interests },
      cited_by,
      articles,
    } = userFetched;
    const citations = cited_by.table.find((item) => item.citations)?.citations;
    const hIndex = cited_by.table.find((item) => item.h_index)?.h_index;
    const i10Index = cited_by.table.find((item) => item.i10_index)?.i10_index;

    articles = await Promise.all(
      articles.map(async (article) => {
        let articleDetail = await googleScholarService.getArticle(
          article.citation_id
        );
        articleDetail = articleDetail.data.citation;

        if (articleDetail.conference) {
          article.conference = articleDetail.conference;
        }

        if (articleDetail.journal) {
          article.journal = articleDetail.journal;
        }

        return article;
      })
    );

    const newUser = {
      id: "c1ae7243-738e-4356-8b1f-cc4c8ad76a0d",
      name,
      affiliations,
      email,
      website,
      interests: interests.map((item) => ({
        title: item.title,
        link: item.link,
        serpapiLink: item.serpapi_link,
      })),
      articles: articles.map((article) => ({
        title: article.title,
        link: article.link,
        citationId: article.citation_id,
        authors: article.authors,
        publication: article.publication,
        journal: article.journal,
        conference: article.conference,
        citedBy: {
          value: article.cited_by.value || undefined,
          link: article.cited_by.link || undefined,
          serpapiLink: article.cited_by.serpapi_link || undefined,
          citesId: article.cited_by.cites_id || undefined,
        },
        year: Number(article.year),
      })),
      citedBy: {
        table: {
          citations: {
            all: citations.all,
            since2017: citations.since_2017,
          },
          hIndex: {
            all: hIndex.all,
            since2017: hIndex.since_2017,
          },
          i10Index: {
            all: i10Index.all,
            since2017: i10Index.since_2017,
          },
        },
      },
    };

    const userUpdated = await userModel.create(newUser);
    console.log(
      "Updated user successfully",
      JSON.stringify(userUpdated, null, 2)
    );

    return userUpdated;
  } catch (err) {
    console.error("ERROR: update user failed", err);
  }
}
//
