// On hover turn blue
// Pass components as a prop

import React from "react"
import "./SidebarOption.css"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

function SidebarOptions({ text, Icon }) {
  return (
    <div className="sidebarOption">
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        className="sidebarStack"
        sx={{
          "&:hover": {
            color: "var(--socialreflect-color)",
          },
        }}
      >
        <Icon />
        <Typography variant="subtitle2">{text}</Typography>
      </Stack>
    </div>
  )
}

export default SidebarOptions
