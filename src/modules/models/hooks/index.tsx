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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type content = {
  type?: string;
  value: string;
};

export interface Model {
  id: string;
  name: string;
  header_image: string;
  content: content[];
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

export function useModels() {
  const db = useFirestore();
  const storage = useStorage();
  const navigate = useNavigate();
  const [state, dispatch] = useAppState();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getModels();

    return () => {};
  }, []);

  async function getModels() {
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
      const storageRef = ref(storage, "blogs/" + file.name);
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
      setLoading(true);
      const imageUrl = await uploadImage(model.header_image as any);
      const modelsCollection = collection(db, "blogs");
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
          message: currentError.message,
        },
      });
    } finally {
      setLoading(false);
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
