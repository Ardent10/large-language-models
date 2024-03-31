import { Layout } from "@/modules/common/layout/layout";
import { CustomTabs } from "@/modules/common/tabs/index.tsx";
import { useAppState } from "@/store/index.tsx";
import { CreateModelSchema } from "@/utils/validations/index.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CreateModelForm } from "../components/createModelForm.tsx";
import { CreateModelPreview } from "../components/createModelPreview/index.tsx";

export interface Model {
  id?: string;
  name: string;
  header_image: string;
  content: string;
  published_date: string;
  created_at: string;
  likes: number;
  parameters: string;
  tags: string[];
  status: string;
  provider: string;
  website: string;
  access_type: string;
}

export function CreateModel() {
  const [state] = useAppState();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();

  const defaultValues = {
    name: "DALL·E",
    content: "",
    published_date: new Date().toString(),
    likes: 50,
    parameters: "13 Billion",
    tags: ["LLM"],
    status: "Published",
    provider: "OpenAI",
    website: "https://openai.com/dall-e-2",
    access_type: "API",
  };
  const { handleSubmit, control, setValue, getValues, watch } = useForm<Model>({
    resolver: zodResolver(CreateModelSchema),
    defaultValues,
    mode: "onChange",
  });

  function handleImageChange() {
    const file = watch("header_image");
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file as unknown as Blob);
    }
  }

  useEffect(() => {
    if (!(state?.userProfile?.user_type === "provider")) {
      navigate("/");
    }
    handleImageChange();
  }, [watch("header_image")]);

  const modelPreviewData: Model = {
    name: watch("name"),
    header_image:
      previewImage ||
      "https://images.nightcafe.studio/jobs/XJuHtov5cclggjsUfPrC/XJuHtov5cclggjsUfPrC--1--kzgnt.jpg?tr=w-1600,c-at_max",
    content: watch("content"),
    published_date: watch("published_date"),
    likes: watch("likes"),
    parameters: watch("parameters"),
    tags: watch("tags"),
    status: watch("status"),
    provider: watch("provider"),
    website: watch("website"),
    access_type: watch("access_type"),
    created_at: new Date().toISOString(),
  };

  const MobileTabs = [
    {
      label: "Form",
      component: (
        <CreateModelForm
          handleSubmit={handleSubmit}
          getValues={getValues}
          control={control}
          setValue={setValue}
        />
      ),
    },
    {
      label: "Preview",
      component: <CreateModelPreview model={modelPreviewData} />,
    },
  ];


  return (
    <Layout>
      <Box className="flex flex-col items-center justify-center w-full px-16 mt-24">
        <Typography className="font-semibold text-2xl sm:text-6xl md:text-9xl py-8 text-[#64c956] uppercase">
          CREATE
        </Typography>
        {isMobile ? (
          <Grid
            id="mobile-model-form-preview"
            className=" flex w-full gap-8 items-center"
          >
            <CustomTabs
              tabs={MobileTabs}
            />
          </Grid>
        ) : (
          <Grid id="model-form-preview" className="flex w-full gap-8 ">
            <CreateModelForm
              handleSubmit={handleSubmit}
              getValues={getValues}
              control={control}
              setValue={setValue}
            />
            <CreateModelPreview model={modelPreviewData} />
          </Grid>
        )}
      </Box>
    </Layout>
  );
}
