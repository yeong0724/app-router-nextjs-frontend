import ClientComponent from "../../../components/client-component";

type Props = {
  searchParams: Promise<{ q: string }>;
};

/**
 * App Router 버전의 Next App에서는 페이지에 전될되는 URL 파라미터나 QueryString이 Props로 전달됩니다.
 */
export default async function Page({ searchParams }: Props) {
  const { q } = await searchParams;

  // 상태, 로직
  return (
    <div>
      Search 페이지
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
}
