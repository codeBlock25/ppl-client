import React, { useState, useEffect } from "react";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { ClipLoader } from "react-spinners";
import { apiUrl } from "../config";

const CriminalView = (props) => {
  const [fetchedResult, setfetchedResult] = useState([]);
  const [error, setErrorStatus] = useState(true);
  const fetcher = async () => {
    let token = "my token should go here";
    let _id = props.location.search.substr(7);
    // console.log(_id)
    await Axios.get(`${apiUrl}/crime/single?id=${_id}&token=${token}`)
      .then((result) => {
        console.log(result.data);
        setfetchedResult([result.data]);
        setErrorStatus(false);
      })
      .catch((err) => {
        setErrorStatus(true);
        if (err["message"] === "Request failed with status code 400") {
          toast.error("invalid user please login");
        } else {
          toast.error(
            "unable to connect due to slow or no internet connection"
          );
        }
      });
  };
  useEffect(() => {
    if (error) {
      fetcher();
    }
  });
  return (
    <div className="caseP">
      <ToastContainer position="bottom-center" />
      {fetchedResult.length <= 0 ? (
        <span className="loader">
          <ClipLoader size="300px" color="#6988a0" />
        </span>
      ) : (
        <>
          <img src="" className="criminal_pic" />
          <span className="dd">
            <span>code:</span> {fetchedResult[0].code}{" "}
          </span>
          <span className="dd">
            <span>crime:</span> {fetchedResult[0].crime}{" "}
          </span>
          <span className="dd">
            <span>court:</span> {fetchedResult[0].court}{" "}
          </span>
          <span className="dd">
            <span>sentence:</span> {fetchedResult[0].sentence}{" "}
          </span>
          <span className="dd">
            <span>date:</span>{" "}
            {moment(fetchedResult[0].sentence_date).format("DD-MMMM-YYYY")}{" "}
          </span>
        </>
      )}
    </div>
  );
};

export default CriminalView;
