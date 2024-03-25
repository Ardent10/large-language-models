interface ModelCardProps {
  model: any;
}
export function ModelCard({ model }: ModelCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        <img
          className="h-48 w-full object-cover"
          src={model.thumbnail}
          alt=""
        />
      </div>
    </div>
  );
}
