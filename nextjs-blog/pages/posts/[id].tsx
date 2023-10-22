import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
// Add this import
import Head from 'next/head';

import { GetStaticProps, GetStaticPaths } from 'next';
// Add this import
import Date from '../../components/date';

export const getStaticProps:GetStaticProps= async ({ params })=> {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
}
export const getStaticPaths:GetStaticPaths = async() => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

// Add this import at the top of the file
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
 
  // return (
  //   <Layout>
  //     <Head>
  //       <title>{postData.title}</title>
  //     </Head>
  //     <article>
  //       <h1 className={utilStyles.headingXl}>{postData.title}</h1>
  //       <div className={utilStyles.lightText}>
  //         <Date dateString={postData.date} />
  //       </div>
  //       <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
  //     </article>
  //   </Layout>
  // );
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );

}