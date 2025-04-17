import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import tou from "@site/static/img/tou.png";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [displayText, setDisplayText] = useState("");
  const fullText = "欢迎来到我的博客";
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
        setShowButton(true);
      }
    }, 150);

    return () => clearInterval(typingEffect);
  }, []);

  return (
    <header className={styles.heroBanner}>
      <div className="container" style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: "2rem" // 增加内边距
      }}>
        <img 
          src={tou} 
          alt="头像" 
          style={{
            width: "300px", // 从200px增大到300px
            height: "300px", // 从200px增大到300px
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "3rem", // 增大下边距
            border: "6px solid #fff", // 加粗边框
            boxShadow: "0 6px 12px rgba(0,0,0,0.15)" // 增强阴影
          }} 
        />
        
        <h1 style={{ 
          fontSize: "2.5rem", // 增大字体
          marginBottom: "2rem", // 增大下边距
          minHeight: "3.5rem",
          fontWeight: "normal" // 调整字体粗细
        }}>
          {displayText}
          <span className={styles.cursor}>|</span>
        </h1>
        
        {showButton && (
          <div className={styles.buttons}>
            <Link 
              className="button button--secondary button--lg" 
              to="/blog"
              style={{
                opacity: 0,
                animation: "fadeIn 0.5s forwards",
                animationDelay: "0.5s",
                fontSize: "1.2rem", // 增大按钮字体
                padding: "1rem 2rem" // 增大按钮内边距
              }}
            >
              前往博客 →
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="个人博客首页"
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .${styles.cursor} {
          animation: blink 1s infinite;
          font-weight: bold;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      <HomepageHeader />
    </Layout>
  );
}