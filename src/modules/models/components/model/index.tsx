import { Model } from "../../hooks";

export function ModelTemplate({ model }: { model: Model }) {
  console.log("MODEL", model);
  const mode = "dark";
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{model.name}</h1>


      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Content:</h2>
        <div className="content">
          <div
            className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                        ${
                          mode === "dark"
                            ? "[&>h1]:text-[#ff4d4d]"
                            : "[&>h1]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h2]:text-white"
                            : "[&>h2]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h3]:text-white"
                            : "[&>h3]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h4]:text-white"
                            : "[&>h4]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h5]:text-white"
                            : "[&>h5]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h6]:text-white"
                            : "[&>h6]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>p]:text-[#7efff5]"
                            : "[&>p]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>ul]:text-white"
                            : "[&>ul]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>ol]:text-white"
                            : "[&>ol]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>ol]:text-white"
                            : "[&>ol]:text-black"
                        }
                        `}
            dangerouslySetInnerHTML={createMarkup(model.content)}
          ></div>
        </div>
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
