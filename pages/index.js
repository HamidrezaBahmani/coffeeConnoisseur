import Head from "next/head";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner";
import Card from "../components/card";

import coffeeStores from "../data/coffee-stores.json";

import Image from "next/image";
export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log("hi banner button");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>
        <div className={styles.cardLayout}>
          {coffeeStores.map((coffeeStore) => {
            return (
              <Card
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl}
                href={`/coffee-store/${coffeeStore.id}`}
                className={styles.card}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}