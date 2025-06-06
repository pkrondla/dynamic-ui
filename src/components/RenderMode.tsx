import React from "react";
import Panel from "./Panel";
import { ScreenDesign } from "../types/design";
import { Typography, Box } from "@mui/material";
import { Typography as AntdTypography, Row, Col } from "antd";

interface Props {
  design: ScreenDesign;
  uiLib: "material" | "antd";
}

const RenderMode: React.FC<Props> = ({ design, uiLib }) => {
  // Group panels by row
  const panelsByRow = design.panels.reduce((acc, panel) => {
    const row = panel.layout.row;
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(panel);
    return acc;
  }, {} as Record<number, typeof design.panels>);

  // Sort panels within each row by order
  Object.keys(panelsByRow).forEach(row => {
    panelsByRow[Number(row)].sort((a, b) => a.layout.order - b.layout.order);
  });

  if (uiLib === "material") {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {design.screenTitle}
        </Typography>
        {Object.entries(panelsByRow).map(([row, panels]) => (
          <Box sx={{ display: 'flex', mb: 2 }} key={row}>
            {panels.map((panel) => (
              <Box sx={{ width: `${panel.layout.width}%` }} key={panel.id}>
                <Panel
                  panel={panel}
                  uiLib={uiLib}
                  isDesignMode={false}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <AntdTypography.Title level={2}>
        {design.screenTitle}
      </AntdTypography.Title>
      {Object.entries(panelsByRow).map(([row, panels]) => (
        <Row gutter={[0, 16]} key={row} style={{ marginBottom: 16 }}>
          {panels.map((panel) => (
            <Col span={Math.round(panel.layout.width * 24 / 100)} key={panel.id}>
              <Panel
                panel={panel}
                uiLib={uiLib}
                isDesignMode={false}
              />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default RenderMode; 