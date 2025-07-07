type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  console.log(id);

  // 상태, 로직
  return <div>Book [ID : {id}] Page 입니다</div>;
}
