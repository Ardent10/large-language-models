import { useFirestore, useStorage } from "@/lib/firebase";

import { useAppState } from "@/store";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Model {
  id?: string;
  name: string;
  header_image: File;
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

const MODELS_COLLECTION = import.meta.env.VITE_FIREBASE_MODEL_COLLECTION_NAME;

export function useModels() {
  const db = useFirestore();
  const storage = useStorage();
  const navigate = useNavigate();
  const [state, dispatch] = useAppState();
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   if (!state?.parentModels) {
  //     getModels();
  //   } else {
  //     setLoading(false);
  //   }
  //   return () => {};
  // }, []);

  async function getModels() {
    try {
      setLoading(true);
      const modelsCollection = await collection(db, MODELS_COLLECTION);
      const modelsQuery = query(modelsCollection);
      const snapshot = await getDocs(modelsQuery);
      const modelsData: Model[] = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            header_image: data.header_image,
            tags: data.tags,
            provider: data.provider,
            website: data.website,
            published_date: data.published_date,
            content: data.content,
            created_at: data.created_at,
            likes: data.likes,
            parameters: data.parameters,
            status: data.status,
            access_type: data.access_type,
          };
        })
        .sort(
          (a, b) =>
            new Date(b.published_date).getTime() -
            new Date(a.published_date).getTime()
        );
      dispatch({ type: "setParentModels", payload: modelsData });
      setLoading(false);
    } catch (error) {
      const currentError = error as Error;
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: currentError.message,
        },
      });
      setLoading(false);
    }
  }

  async function uploadImage(file: File) {
    if (!file) return;

    try {
      setLoading(true);
      const storageRef = ref(storage, "models/" + file.name);
      const snapshot = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setLoading(false);
      return downloadURL;
    } catch (error) {
      const currentError = error as Error;
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: currentError.message,
        },
      });
      setLoading(false);
    }
  }

  async function createModel(model: Model) {
    try {
      dispatch({
        type: "setIsLoading",
        payload: { isLoading: true },
      });
      const imageUrl = await uploadImage(model.header_image as any);
      const modelsCollection = collection(db, MODELS_COLLECTION);
      const res = await addDoc(modelsCollection, {
        ...model,
        header_image: imageUrl,
      });
      if (res.id) {
        dispatch({
          type: "setToggleSnackbar",
          payload: {
            open: true,
            severity: "success",
            message: "Model created successfully",
          },
        });
      }
      await getModels();
      navigate("/models");
    } catch (error) {
      const currentError = error as Error;
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message:
            "An error occurred while creating the model. Please try again.",
        },
      });
    } finally {
      dispatch({
        type: "setIsLoading",
        payload: { isLoading: false },
      });
    }
  }

  async function updateModel(model: Model) {
    try {
      setLoading(true);
      const modelsCollection = collection(db, "blogs");
      const modelDocRef = doc(modelsCollection, model.id);
      await updateDoc(modelDocRef, { ...model });
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "success",
          message: "Model updated successfully",
        },
      });
      await getModels();
    } catch (error) {
      const currentError = error as Error;
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: currentError.message,
        },
      });
    } finally {
      setLoading(false);
    }
  }

  async function deleteModel(id: string) {
    try {
      setLoading(true);
      const modelsCollection = collection(db, "blogs");
      const modelDocRef = doc(modelsCollection, id);
      await updateDoc(modelDocRef, {
        status: "deleted",
      });
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "success",
          message: "Model deleted successfully",
        },
      });

      await getModels();
    } catch (error) {
      const currentError = error as Error;
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: currentError.message,
        },
      });
    } finally {
      setLoading(false);
    }
  }

  async function getModelById(id: string) {
    try {
      setLoading(true);
      const modelsCollection = await collection(db, "blogs");
      const modelsQuery = query(modelsCollection);
      const snapshot = await getDocs(modelsQuery);
      const modelsData: Model[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          header_image: data.header_image,
          tags: data.tags,
          provider: data.provider,
          website: data.website,
          published_date: data.published_date,
          content: data.content,
          created_at: data.created_at,
          likes: data.likes,
          parameters: data.parameters,
          status: data.status,
          access_type: data.access_type,
        };
      });
      const model = modelsData.find((model) => model.id === id);
      setLoading(false);
      return model;
    } catch (error) {
      const currentError = error as Error;
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: currentError.message,
        },
      });
      setLoading(false);
    }
  }

  async function likeModel(id: string) {
    try {
      setLoading(true);
      const model = await getModelById(id);
      if (model) {
        const modelsCollection = collection(db, "blogs");
        const modelDocRef = doc(modelsCollection, id);
        await updateDoc(modelDocRef, {
          likes: model.likes + 1,
        });
        await getModels();
      }
    } catch (error) {
      const currentError = error as Error;
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: currentError.message,
        },
      });

      setLoading(false);
    }
  }

  return {
    loading,
    createModel,
    updateModel,
    deleteModel,
    getModels,
    getModelById,
    uploadImage,
    likeModel,
  };
}

export function useAIModels() {
  const [state, dispatch] = useAppState();
  const [loading, setLoading] = useState<boolean>(false);
  async function Gpt(search: string) {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: search,
            n: 1,
            size: "512x512",
          }),
        }
      );
      const data = await response.json();
      if (data.errors) {
        dispatch({
          type: "setToggleSnackbar",
          payload: {
            open: true,
            severity: "error",
            message: data.errors[0].message,
          },
        });
      }
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "success",
          message: "Prompt generated successfully",
        },
      });
      return data;
    } catch (error) {
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: "An error occurred while generating the prompt",
        },
      });
    } finally {
      setLoading(false);
    }
  }

  async function DallE() {
    return {
      id: 2,
      name: "DALL-E",
      image: "/assets/models/dall-e.jpeg",
      description:
        "OpenAI's DALL-E is a language model that can generate human-like text.",
      href: "/models/generate/dall-e",
    };
  }

  async function GeminiPro() {
    return {
      id: 3,
      name: "Gemini Pro",
      image: "/assets/models/gemini.jpg",
      description:
        "OpenAI's Gemini Pro is a language model that can generate human-like text.",
      href: "/models/generate/gemini-pro",
    };
  }

  async function GeminiProVision() {
    return {
      id: 4,
      name: "Gemini Pro Vision",
      image: "/assets/models/gemini-pro.png",
      description:
        "OpenAI's Gemini Pro Vision is a language model that can generate human-like text.",
      href: "/models/generate/gemini-pro-vision",
    };
  }

  return {
    Gpt,
    DallE,
    GeminiPro,
    GeminiProVision,
  };
}
