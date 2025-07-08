type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <div>Book [ID : {id}] Page 입니다</div>;
}
