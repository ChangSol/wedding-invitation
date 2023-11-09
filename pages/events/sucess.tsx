import { NextPageContext } from 'next';
import Link from 'next/link';

const Sucess = ({ query }: any) => {
  console.log(query.phone);
  return (
    <div>
      <div>이벤트를 참여해 주셔서 감사합니다.</div>
      <Link href={'/'}>
        <button>HOME</button>
      </Link>
    </div>
  );
};

export default Sucess;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  return { props: { query } };
};
