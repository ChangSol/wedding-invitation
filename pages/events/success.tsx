import { NextPageContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Success = () => {
  const router = useRouter();
  const query = router.query;

  React.useEffect(() => {
    if (query?.phone) {
      console.log(query.phone);
    } else {
      router.push('/events');
    }
  }, [query?.phone, router]);

  return (
    <div>
      <div>이벤트를 참여해 주셔서 감사합니다.</div>
      <Link href={'/'}>
        <button>HOME</button>
      </Link>
    </div>
  );
};

export default Success;

// export const getServerSideProps = async (context: NextPageContext) => {
//   const { query } = context;
//   return { props: { query } };
// };
