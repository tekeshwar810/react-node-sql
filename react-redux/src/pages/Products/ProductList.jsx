import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Space, Image, Popconfirm, message } from "antd";
import { listProducts, deleteProduct } from "../../services/productService";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetch = async () => {
    setLoading(true);
    const res = await listProducts();
    if (res.success) {
      const formattedData = res.data.rows.map((product) => ({
        ...product,
        image: product.productimages?.[0]?.image || null,
      }));
      setData(formattedData);
    } else {
      if (res.message == "Unauthorized") {
        localStorage.removeItem('userData');
        navigate("/login");
      }
      alert(res.message);
      
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    message.success("Deleted");
    fetch();
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (src) => (src ? <Image width={60} src={src} /> : null),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => navigate(`/products/${record.id}/edit`)}>
            Edit
          </Button>
          <Popconfirm title="Delete?" onConfirm={() => handleDelete(record.id)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => navigate("/products/new")}>
          New Product
        </Button>
      </Space>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </div>
  );
};

export default ProductList;
