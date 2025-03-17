import { Grid2, IconButton, Typography, TypographyProps } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useStoreApp } from "@/store/application.store";
import {
  EntityOptions,
  ObjectEntity,
  ViewOptions,
} from "@/interfaces/entity.interface";
import { RolePermissions } from "@/interfaces/application.interface";

type PropsExtends = {
  title: string;
  origin: EntityOptions;
} & TypographyProps;

const objectEntity: ObjectEntity = {
  types: "viewFormType",
  properties: "viewFormProperties",
};

function HeaderTable({ title, origin = "types", ...props }: PropsExtends) {
  const { setView, setAction } = useStoreApp((state) => state);

  function openView(view: ViewOptions, action: RolePermissions) {
    setView(view);
    setAction(action);
  }

  return (
    <Grid2
      container
      justifyContent="center"
      direction="row"
      spacing={2}
      size={{ lg: 10 }}
    >
      <Grid2 size={{ lg: 6 }}>
        <Typography {...props}>{title}</Typography>
      </Grid2>
      <Grid2 size={{ lg: 4 }}>
        <IconButton onClick={() => openView(objectEntity[origin], "create")}>
          <AddBoxIcon />
        </IconButton>
      </Grid2>
    </Grid2>
  );
}

export default HeaderTable;
