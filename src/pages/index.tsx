import Ball from "@/components/Ball";

const Index = () => {
  return (
    <div className="app">
      {[...Array(5)].map((_, i) => <Ball key={i} />)}
    </div>
  );
};
export default Index;
