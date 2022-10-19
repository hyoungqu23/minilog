import PostCard from 'components/post/PostCard';
import type { GetStaticProps, NextPage } from 'next';
import { getNotionPostList } from 'services/notionApiServices';
import { NotionPostDataType } from 'types';

type BlogProps = {
  data: NotionPostDataType;
};

const Blog: NextPage<BlogProps> = ({ data }) => {
  return (
    <>
      {data.results.map(({ properties }) => (
        <PostCard
          key={properties.slug.rich_text[0].plain_text}
          title={properties.title.title[0].plain_text}
          slug={properties.slug.rich_text[0].plain_text}
          date={properties.date.date.start}
          summary={properties.summary.rich_text[0].plain_text}
          category={properties.category.multi_select}
        />
      ))}
    </>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  const response = await getNotionPostList({
    filter: {
      property: 'status',
      status: {
        equals: 'Upload',
      },
    },
    sorts: [
      {
        property: 'date',
        direction: 'descending',
      },
    ],
  });

  const data = response.data;

  return {
    props: { data },
  };
};
