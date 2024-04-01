import { useFirestore, useStorage } from "@/lib/firebase";
import { useAppState } from "@/store";
import { GoogleGenerativeAI } from "@google/generative-ai";
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
      const modelsCollection = collection(db, MODELS_COLLECTION);
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
      const modelsCollection = collection(db, MODELS_COLLECTION);
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
      const modelsCollection = await collection(db, MODELS_COLLECTION);
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
        const modelsCollection = collection(db, MODELS_COLLECTION);
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
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  async function GeminiPro(prompt: string) {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContentStream(prompt);
      let text = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;

        dispatch({
          type: "setPromptResult",
          payload: {
            text: text,
          },
        });
        setLoading(false);
      }
    } catch (error) {
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: "An error occurred while generating the prompt.",
        },
      });
    } finally {
      setLoading(false);
    }
  }

  // Converts a File object to a GoogleGenerativeAI.Part object.
  // Converts a File object to a GoogleGenerativeAI.Part object.
  async function fileToGenerativePart(
    file: File
  ): Promise<{ inlineData: { data: string; mimeType: string } }> {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        resolve(reader.result?.toString().split(",")[1] || "");
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  async function GeminiProVision({
    promptString,
    imgFiles,
  }: {
    promptString: string;
    imgFiles: File[];
  }) {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const prompt = promptString;

      // Convert the image files to GenerativeAI parts.
      const imagePartsPromises = imgFiles.map(fileToGenerativePart);
      const imageParts = await Promise.all(imagePartsPromises);

      // Generate the content.
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();
      dispatch({
        type: "setPromptResult",
        payload: { text: text },
      });
      setLoading(false);
    } catch (error) {
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: "An error occurred while generating the prompt.",
        },
      });
    } finally {
      setLoading(false);
    }
  }

  async function Gpt(prompt: string) {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
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
          message:
            "Usage limit exceeded. Please upgrade your plan to continue.",
        },
      });
      dispatch({
        type: "setPromptResult",
        payload: data.choices[0].message.content,
      });

      return data.choices[0].message.content;
    } catch (error) {
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message:
            "Usage limit exceeded. Please upgrade your plan to continue.",
        },
      });
    } finally {
      setLoading(false);
    }
  }
  async function DallE(prompt: string) {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: "512x512",
          }),
        }
      );
      const res = await response.json();
      if (res.errors) {
        dispatch({
          type: "setToggleSnackbar",
          payload: {
            open: true,
            severity: "error",
            message: res.errors[0].message,
          },
        });
      }
      dispatch({
        type: "setPromptResult",
        payload: res?.data[0]?.url,
      });
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "success",
          message: "Prompt generated successfully",
        },
      });
      return res?.data[0]?.url;
    } catch (error) {
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message:
            "Usage limit exceeded. Please upgrade your plan to continue.",
        },
      });
    } finally {
      setLoading(false);
    }
  }

  return {
    Gpt,
    DallE,
    GeminiPro,
    GeminiProVision,
    loading,
  };
}
