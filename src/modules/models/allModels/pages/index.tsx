import { Layout } from "@/modules/common/layout/layout";
import { useAppState } from "@/store";
import { useEffect } from "react";
import { ModelTemplate } from "../../components/model";
import { Model, useModels } from "../../hooks";

export function AllModels() {
  const [state] = useAppState();
  const { getModels, loading,} = useModels();

  useEffect(() => {
    async function fetchModelsData() {
      await getModels();
    }
    fetchModelsData();
  }, []);

  return (
    <Layout>
      <div className="text-white ">
        {state?.parentModels?.map((model: Model) => (
          <ModelTemplate key={model.id} model={model} />
        ))}
      </div>
    </Layout>
  );
}
