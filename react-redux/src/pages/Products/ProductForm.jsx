import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { Form, Input, Button, Card, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import {
  createProduct,
  updateProduct,
  getProduct,
} from "../../services/productService";
import productValidation from "../../validation/productValidation";

const { Dragger } = Upload;

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState({ name: "", price: "", image: "", description :"" });

  useEffect(() => {
    if (id) {

      (async () => {
        const getData = await getProduct(id);
        console.log(getData.data,'p');
        if (getData.success){
          setInitial({
            name: getData?.data?.name || "",
            price: getData?.data?.price || "",
              image: getData?.data?.productimages[0]?.image || "",
              description: getData?.data?.description || "",
            });
          }
      })();
    }
  }, [id]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
      <Card title={id ? "Edit Product" : "New Product"} style={{ width: 600 }}>
        <Formik
          enableReinitialize
          initialValues={initial}
          validationSchema={productValidation}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("price", values.price);
              formData.append("description", values.description);
              if (values.image instanceof File) {
                formData.append("images", values.image);

              }

              if (id) {
               const updateProductResponse = await updateProduct(id, formData);
                if(updateProductResponse.success){
                  alert("Product updated successfully");
                  navigate("/products");
                }
               
              } else {
                const addProductResponse = await createProduct(formData);
                console.log(addProductResponse,'sdfdsafa');
                if(addProductResponse.success){
                  alert("Product added successfully");
                }
                navigate("/products");
              }
              
              
            } catch (err) {
              message.error("Save failed");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleSubmit, setFieldValue, setFieldTouched, handleChange, handleBlur, errors, touched }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item 
                label="Name"
                validateStatus={touched.name && errors.name ? "error" : ""}
                help={touched.name && errors.name ? errors.name : null}
              >
                <Input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item 
                label="Price"
                validateStatus={touched.price && errors.price ? "error" : ""}
                help={touched.price && errors.price ? errors.price : null}
              >
                <Input
                  name="price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item 
                label="Description"
                validateStatus={touched.description && errors.description ? "error" : ""}
                help={touched.description && errors.description ? errors.description : null}
              >
                <Input.TextArea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                />
              </Form.Item>

              <Form.Item 
                label="Image"
                validateStatus={touched.image && errors.image ? "error" : ""}
                help={touched.image && errors.image ? errors.image : null}
              >
                <Dragger
                  name="file"
                  multiple={false}
                  showUploadList={false}
                  beforeUpload={(file) => {
                    console.log(file);
                    setFieldValue("image", file);
                    setFieldTouched("image", true);
                    return false;
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to upload
                  </p>
                </Dragger>
                {values.image ? (
                  <img
                    src={
                      values.image instanceof File
                        ? URL.createObjectURL(values.image)
                        : values.image
                    }
                    alt="preview"
                    style={{ marginTop: 8, maxWidth: "100%" }}
                  />
                ) : null}
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button
                  style={{ marginLeft: 8 }}
                  onClick={() => navigate("/products")}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default ProductForm;
