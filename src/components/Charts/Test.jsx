import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
} from "react-flow-renderer";
import { Button, Modal, Input, Form } from "antd";

function ReactFlowRenderer() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: ConnectionLineType.SmoothStep,
            animated: true,
            style: { stroke: "red" },
          },
          eds
        )
      ),
    [setEdges]
  );
  const getNodeId = () => Math.random();
  function handleOk(data) {
    onAdd(data.nodeName);
    setIsModalVisible(false);
  }
  const onAdd = useCallback(
    (data) => {
      const newNode = {
        id: String(getNodeId()),
        data: { label: data },
        position: {
          x: 50,
          y: 0,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );
  return (
    <div style={{ height: "100vh", margin: "10px", width: "100%" }}>
      <Modal
        title="Basic Modal"
        open={isModalVisible}
        onCancel={()=> setIsModalVisible(false)}
      >
        <Form onFinish={handleOk} autoComplete="off" name="new node">
          <Form.Item label="Node Name" name="nodeName">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Custom Name Node
      </Button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // onInit={onInit}
        fitView
        attributionPosition="bottom-left"
        connectionLineType={ConnectionLineType.SmoothStep}
      />
    </div>
  );
};

 const initialNodes = [
    {
      id: "1",
      type: "input",
      data: {
        label: "Node 1",
      },
      position: { x: 250, y: 0 },
    },
    {
      id: "2",
      data: {
        label: "Node 2",
      },
      position: { x: 100, y: 100 },
    },
    {
      id: "3",
      data: {
        label: "Node 3",
      },
      position: { x: 400, y: 100 },
      style: {
        background: "#D6D5E6",
        color: "#333",
        border: "1px solid #222138",
        width: 180,
      },
    },
  ];
  
 const initialEdges = [
    { id: "e1-2", source: "1", target: "2", type: "smoothstep", animated: true },
    { id: "e1-3", source: "1", target: "3", type: "smoothstep", animated: true },
  ];
  
export default ReactFlowRenderer;



