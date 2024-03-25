import { Layout } from "@/modules/common/layout/layout";
import { useAppState } from "@/store";
import { useEffect } from "react";
import { Model, useModels } from "../../hooks";

export function LLM() {
  const [state] = useAppState();
  const { getModels, loading } = useModels();

  useEffect(() => {
    async function fetchModelsData() {
      await getModels();
    }
    fetchModelsData();
  }, []);

  return (
    <Layout>
      <div>LLM</div>
      <div>
        {state.parentModels.map((model: Model) => (
          <div key={model.id}>
            <h1>{model.name}</h1>
            <p>{model.access_type}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
