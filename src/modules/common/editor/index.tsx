import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { Loader } from "../loader";

interface RichTextEditorProps {
  setValue: any;
  getValues: any;
}

export function RichTextEditor({ setValue, getValues }: RichTextEditorProps) {
  const editorApiKey = import.meta.env.VITE_TINYMCE_API_KEY;
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative flex flex-col w-full items-center justify-center shadow-md border border-green-600 rounded-xl">
      {isLoading && (
        <div className="h-80  w-full flex flex-col items-center justify-center">
          <Loader componentLoader={true} />
        </div>
      )}
      <div className="w-full">
        <Editor
          apiKey={editorApiKey}
          onEditorChange={(content, editor) => {
            setValue("content", content);
          }}
          onInit={(evt, editor) => {
            setLoading(false);
          }}
          value={getValues("content") || ""}
          init={{
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (
              _request: any,
              respondWith: { string: (arg0: () => Promise<never>) => any }
            ) =>
              respondWith.string(() =>
                Promise.reject("See docs to implement AI Assistant")
              ),
          }}
          initialValue="Write about your model in here..."
        />
      </div>
    </div>
  );
}
