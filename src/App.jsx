import React, { useState } from "react";
import { CloudIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { APP_ID } from "./AppId";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";

const api = {
  key: APP_ID,
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};
const axiosApi = axios.create({
  baseURL: api.baseUrl,
});

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [show, setShow] = useState(false);
  const SearchWeather = async () => {
    try {
      if (search.trim() === "") {
      } else {
        await axiosApi
          .get(`weather?q=${search}&units=metric&APPID=${api.key}`)
          .then((result) => {
            setWeather(result.data);
            console.log(weather);
            setShow(true);
          })
          .catch((error) => console.log(error.message));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-evenly h-screen items-center">
      <Card className="mt-6 w-96">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src="https://st4.depositphotos.com/1653005/21507/i/450/depositphotos_215074526-stock-photo-weather-forecast-background-variety-weather.jpg"
            alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            {show
              ? `${weather.name} ,  ${weather.sys.country}`
              : "Search town/city..."}
          </Typography>
          <Typography variant="h2" color="blue-gray" className="mb-2 ">
            {show && `${weather.main.temp}°C`}
          </Typography>
          <Typography color="blue-gray">
            {show && weather.weather[0].main}
          </Typography>
          <Typography>{show && weather.weather[0].description}</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <div className="flex w-full shrink-0 gap-2 md:w-m80">
            <div className="w-full">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                label="Search"
                className="w-64"
              />
            </div>
            <Button
              onClick={() => {
                SearchWeather();
              }}
              className="flex items-center gap-3"
              size="sm"
            >
              <CloudIcon strokeWidth={2} className="h-4 w-6" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
