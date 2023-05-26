import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import Date from '../../components/Date'
import { useRouter } from 'next/router'

export async function getStaticPaths() {
  // const paths = getAllPostIds()

  const paths = [
    {
      params: {
        id: 'ssg-ssr',
      },
    },
  ]
  return {
    paths,
    fallback: 'blocking',

    //false => 없는 링크 : 404,
    //true => throw error
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}
export default function Post({ postData }) {
  const router = useRouter()
  console.log('!!! fallback', router.isFallback)

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <Layout>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
