import { Layout } from "@/modules/common/layout/layout";
import { CreateModelForm } from "../../components/createModelForm.tsx";
import { CreateModelPreview } from "../../components/createModelPreview/index.tsx";

export function CreateModel() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full px-16 mt-24">
        <h1 className="font-semibold text-9xl py-8 text-green-600">CREATE</h1>
        <div className="flex  w-full gap-8">
          <CreateModelForm />
          <CreateModelPreview />
        </div>
      </div>
    </Layout>
  );
}
