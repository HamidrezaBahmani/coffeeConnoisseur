import Head from "next/head";
import { useRouter } from "next/router";
const DynamicRoutes = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{router.query.dynamic}</title>
      </Head>
      Hi there I am a dynamic route
      {router.query.dynamic}
    </div>
  );
};

export default DynamicRoutes;
