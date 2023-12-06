import { HiOutlineChartBarSquare } from "react-icons/hi2";

import {
    Card,
    CardBody,
    CardHeader,
    Typography
  } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { useState , useEffect } from "react";
import axios from "axios";
   
export default function Example(props) {
  const [categoriesList , setCategoriesList] = useState([]);

  const [data , setData] = useState([]);

  function getData(){
    axios.get(`${process.env.REACT_APP_API_URL}/admin/graphData` , 
      {
        withCredentials: true,
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${props.token}`
        },
      }
    )
    .then((resp) => {
      const res = resp.data;
      res.access_token && props.setToken(res.access_token);
      setData(res.data);
      setCategoriesList(res.categories);
    })
    .catch(function(error){
      console.log(error);
      window.location.href = "/Login";
    });
  }

  useEffect(() => {
    getData();
  } , []);

  const chartConfig = {
    type: "bar",
    series: [
      {
        name: "Pay",
        data: data,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#18c8db"],
      plotOptions: {
        bar: {
          columnWidth: "30%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: categoriesList,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
    return (
      <Card className=" bg-gray-200 h-full p-2">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div className="w-max rounded-lg bg-sky-600 p-5 text-white">
            <HiOutlineChartBarSquare className=" text-2xl" />
          </div>
          <div className=" p-2">
            <Typography variant="small" color="gray" className="max-w-sm font-normal text-xl">
              Payout
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-0">
          <Chart {...chartConfig} />
        </CardBody>
      </Card>
    );
  }