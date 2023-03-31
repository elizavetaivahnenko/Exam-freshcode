import React from "react";
import styles from "./ArticlesRegList.module.sass";
import articles from "./articles.json";
import CONSTANTS from "../../constants";
import ReactHtmlParser from "react-html-parser";

function ArticlesRegList() {
  return (
    <div className={styles.articlesMainContainer}>
      {articles.map((column, i) => (
        <div key={i} className={styles.ColumnContainer}>
          {column.map((data, j) => (
            <div key={j}>
              <div className={styles.headerArticle}>{data.head}</div>
              <div className={styles.article}>
                {ReactHtmlParser(
                  data.body.replace("{CONSTANTS.PHONE}", `${CONSTANTS.PHONE}`)
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ArticlesRegList;
