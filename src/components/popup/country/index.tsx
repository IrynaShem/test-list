import { FC, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import { InputCoutry } from "./InputCoutry";
import { ListCountry } from "./List";
import useDebounce from "./useDebounce";
import { arr, CountryType } from "../../../country";

export type CountryArrType = (CountryType | number)[];
const Wrapper = styled("div")`
  padding: 20px;
  margin-top: 50px;
  position: relative;
  width: 494px;
  height: 446px;

  background: #ffffff;
  border: 1px solid #e1e3e6;
  box-shadow: 9px 32px 35px rgba(0, 0, 0, 0.0464653);
  border-radius: 14px;
  box-sizing: border-box;
`;
const WrappSelectedSwitch = styled("div")`
  width: 100%;
  height: 100%;
  margin-left: -8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: "Campton";
  font-style: normal;
  font-weight: 550;
  font-size: 16px;
  line-height: 22px;

  letter-spacing: -0.5px;

  color: #232323;
`;
const WrappClear = styled("div")`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: "Campton";
  font-style: normal;
  font-weight: 550;
  font-size: 16px;
  line-height: 22px;

  letter-spacing: -0.5px;

  color: #232323;
  .clear {
    cursor: pointer;
  }
`;
const DividerCustom = styled(Divider)`
  margin-top: 12.44px;
`;
const WrappSave = styled("div")`
  width: 100%;
  height: 58px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
const SaveBtn = styled("div")`
  width: 87px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #60d09b;
  border-radius: 50px;
  font-family: "Campton-Book";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  text-align: center;
  letter-spacing: -0.5px;

  color: #ffffff;
`;
const ContainerMain = styled("div")`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const label = { inputProps: { "aria-label": "Switch demo" } };
export const CountryPopup: FC<{}> = () => {
  const [checked, setChecked] = useState(false);
  const [checkedList, setCheckedList] = useState<CountryArrType>([0]);
  const [checkedListOnly, setCheckedListOnly] = useState<CountryType[]>([]);

  const switchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const [value, setValue] = useState<string>("");
  const [filteredCountries, setFilteredCountries] =
    useState<CountryType[]>(arr);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };
  const debouncedSearchTerm = useDebounce(value, 200);
  useEffect(() => {
    const filtered = arr.filter((country) =>
      country.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [debouncedSearchTerm]);
  useEffect(() => {
    const intersectedArray = filteredCountries.filter((element: CountryType) =>
      checkedList.includes(element)
    );
    setCheckedListOnly(intersectedArray);
  }, [checkedList, filteredCountries]);
  const clearList = () => {
    setCheckedList([0]);
  };
  return (
    <ContainerMain>
      <Wrapper>
        <Grid container spacing={1}>
          <Grid xs={12}>
            <InputCoutry value={value} onChange={onChange} />
            <DividerCustom />
          </Grid>

          <Grid xs={6}>
            <WrappSelectedSwitch>
              <Switch {...label} checked={checked} onChange={switchHandler} />
              Show selected only
            </WrappSelectedSwitch>
          </Grid>
          <Grid xs={6} alignItems="start" justifyContent="flex-end">
            <WrappClear>
              <div className="clear" onClick={() => clearList()}>
                clear all
              </div>
            </WrappClear>
          </Grid>
          <Grid xs={12}>
            <ListCountry
              filteredCountries={checked ? checkedListOnly : filteredCountries}
              checked={checkedList}
              setChecked={setCheckedList}
            />
            <DividerCustom />
          </Grid>
          <Grid xs={12}>
            <WrappSave>
              <SaveBtn>Save</SaveBtn>
            </WrappSave>
          </Grid>
        </Grid>
      </Wrapper>
    </ContainerMain>
  );
};
