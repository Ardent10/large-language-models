import { Layout } from "@/modules/common/layout/layout";
import { useAppState } from "@/store";
import { useEffect } from "react";
import { Model, useModels } from "../../hooks";

export function LLM() {
  const [state] = useAppState();
  const { getModels, loading, error } = useModels();

  useEffect(() => {
    async function fetchModelsData() {
      await getModels();
    }
    fetchModelsData();
  }, []);

  console.log("STATE", state);
  return (
    <Layout>
      <div>LLM</div>
      <div>
        {state.parentModels.map((model: Model) => (
          <div key={model.id}>
            <h1>{model.name}</h1>
            <p>{model.content[0]}</p>
            <p>{model.tags.join(", ")}</p>
            <p>{model.provider}</p>
            <p>{model.website}</p>
            <p>{model.published_date}</p>
            <p>{model.created_at}</p>
            <p>{model.likes}</p>
            <p>{model.parameters}</p>
            <p>{model.status}</p>
            <p>{model.access_type}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
