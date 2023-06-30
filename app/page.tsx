import Image from 'next/image';

export default async function Index() {
  return (
    <div>
      <h1>osom.run</h1>
      <Image src="/osom.run.svg" alt="osom.run logo" width={112} height={48} />
    </div>
  );
}
