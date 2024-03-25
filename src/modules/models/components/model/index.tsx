import { Model } from "../../hooks";

export function ModelTemplate({ model }: { model: Model }) {
  console.log("MODEL", model);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{model.name}</h1>
      <img
        src={model.header_image}
        alt={model.name}
        className="mb-4 rounded-lg"
      />

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Content:</h2>
        {model.content.map((contentItem, index) => (
          <p key={index} className="mb-2">
            {contentItem.value}
          </p>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Tags:</h2>
        <div className="flex flex-wrap">
          {model.tags.map((tag, index) => (
            <span
              key={index}
              className="mr-2 mb-2 px-2 py-1 bg-green-600 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="mb-2">
        <strong>Provider:</strong> {model.provider}
      </p>
      <p className="mb-2">
        <strong>Website:</strong>{" "}
        <a href={model.website} className="text-blue-500 hover:underline">
          {model.website}
        </a>
      </p>
      <p className="mb-2">
        <strong>Published Date:</strong> {model.published_date}
      </p>
      <p className="mb-2">
        <strong>Created At:</strong> {model.created_at}
      </p>
      <p className="mb-2">
        <strong>Likes:</strong> {model.likes}
      </p>
      <p className="mb-2">
        <strong>Parameters:</strong> {model.parameters}
      </p>
      <p className="mb-2">
        <strong>Status:</strong> {model.status}
      </p>
      <p className="mb-2">
        <strong>Access Type:</strong> {model.access_type}
      </p>
    </div>
  );
}
