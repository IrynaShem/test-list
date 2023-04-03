import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { FC } from "react";
import { CountryType } from "../../../../country";
import { CountryArrType } from "..";
const ListBox = styled(List)`
  width: 100%;
  height: 270px;
  overflow: auto;
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar {
    width: 12px;
    background-color: #fff;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(52, 52, 52, 0.51);
  }
`;
const ListCustom = styled(ListItem)`
  height: 42px;
`;
const CheckboxCustom = styled(Checkbox)`
  position: relative;
  left: -15px;
`;
const ListItemTextCustom = styled(ListItemText)`
  position: relative;
  left: -30px;
`;

export const ListCountry: FC<{
  filteredCountries: CountryType[];
  checked: CountryArrType;
  setChecked: (arr: CountryArrType) => void;
}> = ({ filteredCountries, checked, setChecked }) => {
  const handleToggle = (value: CountryType) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <ListBox>
      {filteredCountries.length < 1 ? (
        "empty"
      ) : (
        <>
          {" "}
          {filteredCountries.map((value) => {
            const labelId = `checkbox-list-label-${value.name}`;

            return (
              <ListCustom key={value.name} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon>
                    <CheckboxCustom
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemTextCustom id={labelId} primary={value.name} />
                </ListItemButton>
              </ListCustom>
            );
          })}
        </>
      )}
    </ListBox>
  );
};
