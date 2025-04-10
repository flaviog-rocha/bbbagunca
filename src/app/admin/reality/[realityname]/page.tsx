export default function RealityPage({
    params,
  }: {
    params: { realityname: string };
  }) {
    return <div>Reality name: {params.realityname}</div>;
  }