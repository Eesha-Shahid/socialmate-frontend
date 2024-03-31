import React from "react";
import { AuthLayout } from "@/components";
import { Button, Segmented, Space, Switch, Table, TableProps } from "antd";
import { fixedColumns, columns } from "@/components/tableColumn";

const Subscriptions = () => {
  const [fixed, setFixed] = React.useState(true);
  const [bordered, setBordered] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const [count, setCount] = React.useState(10000);

  const getData = (count: number) => {
    const data: RecordType[] = new Array(count).fill(null).map((_, index) => ({
      id: index,
      firstName: `First_${index.toString(16)}`,
      lastName: `Last_${index.toString(16)}`,
      age: 25 + (index % 10),
      address1: `New York No. ${index} Lake Park`,
      address2: `London No. ${index} Lake Park`,
      address3: `Sydney No. ${index} Lake Park`,
    }));

    return data;
  };

  const tblRef: Parameters<typeof Table>[0]["ref"] = React.useRef(null);
  const data = React.useMemo(() => getData(count), [count]);

  const mergedColumns = React.useMemo<typeof fixedColumns>(() => {
    if (!fixed) {
      return columns;
    }

    if (!expanded) {
      return fixedColumns;
    }

    return fixedColumns?.map((col) => ({ ...col, onCell: undefined }));
  }, [expanded, fixed]);

  const expandableProps = React.useMemo<
    TableProps<RecordType>["expandable"]
  >(() => {
    if (!expanded) {
      return undefined;
    }

    return {
      columnWidth: 48,
      expandedRowRender: (record) => (
        <p style={{ margin: 0 }}>🎉 Expanded {record.address1}</p>
      ),
      rowExpandable: (record) => record.id % 2 === 0,
    };
  }, [expanded]);
  return (
    <div style={{ padding: 64 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space>
          <Switch
            checked={bordered}
            onChange={() => setBordered(!bordered)}
            checkedChildren="Bordered"
            unCheckedChildren="Bordered"
          />
          <Switch
            checked={fixed}
            onChange={() => setFixed(!fixed)}
            checkedChildren="Fixed"
            unCheckedChildren="Fixed"
          />
          <Switch
            checked={expanded}
            onChange={() => setExpanded(!expanded)}
            checkedChildren="Expandable"
            unCheckedChildren="Expandable"
          />
          <Switch
            checked={empty}
            onChange={() => setEmpty(!empty)}
            checkedChildren="Empty"
            unCheckedChildren="Empty"
          />
          <Segmented
            value={count}
            onChange={(value: number) => setCount(value)}
            options={[
              {
                label: "None",
                value: 0,
              },
              {
                label: "Less",
                value: 4,
              },
              {
                label: "Lot",
                value: 10000,
              },
            ]}
          />

          {data.length >= 999 && (
            <Button
              onClick={() => {
                tblRef.current?.scrollTo({ index: 999 });
              }}
            >
              Scroll To index 999
            </Button>
          )}
        </Space>

        <Table
          bordered={bordered}
          virtual
          columns={mergedColumns}
          scroll={{ x: 2000, y: 400 }}
          rowKey="id"
          dataSource={empty ? [] : data}
          pagination={false}
          ref={tblRef}
          rowSelection={
            expanded
              ? undefined
              : {
                  type: "radio",
                  columnWidth: 48,
                }
          }
          expandable={expandableProps}
        />
      </Space>
    </div>
  );
};

export default Subscriptions;
