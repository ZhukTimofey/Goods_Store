import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDropzone } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { editProduct, requestForBuying } from "../GoodsStore";

interface Form {
  title: string;
  excerpt: string;
  price: number;
  img: string;
}
interface Props {
  title: string;
  excerpt: string;
  price: number;
  img: string;
  id: string;
}

const EditPage = ({ title, excerpt, price, img, id }: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      title: title,
      excerpt: excerpt,
      price: price,
      img: img,
    },
  });
  const store = useAppSelector((state) => state.userStore);
  const dispatch = useAppDispatch();
  const onDrop = async (img: Blob[] | undefined) => {
    if (img && img.length) {
      const reader = new FileReader();
      reader.readAsDataURL(img[0]);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setValue("img", reader.result);
        }
      };
    }
  };

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const good = { ...data, id: id };
    dispatch(editProduct(good));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <div>
      <form className={"form-wrapper"} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          rules={{
            required: { value: true, message: "Title is required" },
            minLength: { value: 3, message: "Is too short" },
          }}
          render={({ field }) => (
            <TextField
              error={!!errors.title}
              sx={{ margin: "16px 0" }}
              required
              id="outlined-required"
              label="Title"
              helperText={errors?.title?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="excerpt"
          defaultValue={""}
          control={control}
          rules={{
            required: { value: true, message: "Excerpt is required" },

            minLength: { value: 3, message: "Is too short" },
          }}
          render={({ field }) => (
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Default Value"
              {...field}
            />
          )}
        />
        <Controller
          name="price"
          defaultValue={0}
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ margin: "16px 0" }}
              id="outlined-number"
              label="Price"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              {...field}
            />
          )}
        />
        <Controller
          name="img"
          control={control}
          render={() => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          )}
        />
        <Button
          sx={{ minWidth: "200px", margin: "0 auto" }}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Создать
        </Button>
      </form>
    </div>
  );
};

export default EditPage;
